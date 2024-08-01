import { BlockchainAnchor, Network } from "@verida/types"
import { activeDIDCount, getDIDs } from "@verida/vda-did-resolver"

import { clientEnvVars } from "@/config/client"
import { getDidDocument } from "@/features/did/utils"
import { Identity } from "@/features/identities/types"
import { csv2json } from "@/features/metrics/utils"
import { Profile } from "@/features/verida/types"
import { getPublicProfile } from "@/features/verida/utils"

/**
 * Build the URL of the identities stats file, based on the metrics base URL and the network.
 *
 * @param registryBlockchain The blockchain of the DID registry.
 * @returns the URL of the identities stats file.
 */
export function getIdentitiesStatsFileUrl(
  registryBlockchain: BlockchainAnchor
) {
  // Map the network to the path of the metrics file
  // Note 1: Since the protocol v4, the identities are not related to the Verida
  // Network, but we still use the asumption of a one-one mapping for now.
  // Note 2: The metrics endpoint is not up-to-date with the network names.
  const resolvedNetwork =
    registryBlockchain === BlockchainAnchor.POLPOS ? "mainnet" : "testnet"

  return `${clientEnvVars.NEXT_PUBLIC_METRICS_BASE_URL}/network/${resolvedNetwork}/stats.csv`
}

/**
 * Get the assumed blockchain anchor of the DID registry for a given Verida Network.
 *
 * Note: "Assumed" because since protocol v4, the DID registry is no longer associated to the Verida Network, but for simplicity, we still use the assumption of a one-one mapping for now.
 *
 * @param network The Verida Netowork of the application.
 * @returns The blockchain anchor for the DID registry
 */
export function getDidRegistryBlockchainForNetwork(network: Network) {
  // Map the network to the blockchain anchor
  // Note 1: Since the protocol v4, the identities are not related to the Verida
  // Network, but we still use the asumption of a one-one mapping for now.
  return network === Network.MYRTLE
    ? BlockchainAnchor.POLPOS
    : BlockchainAnchor.POLAMOY
}

/**
 * The assumed blockchain anchor of the DID registry, based on the Verida Network defined in the environment variable.
 *
 * Note: "Assumed" because since protocol v4, the DID registry is no longer associated to the Verida Network, but for simplicity, we still use the assumption of a one-one mapping for now.
 */
export const didRegistryBlockchain = getDidRegistryBlockchainForNetwork(
  clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
)

/**
 * Get the statistics data of the identities for a given DID registry.
 *
 * @param registryBlockchain The blockchain of the DID registry.
 * @returns The statistics data.
 */
export async function getIdentitiesStatsData(
  registryBlockchain: BlockchainAnchor
) {
  // TODO: To rework

  let isloading = true

  const url = getIdentitiesStatsFileUrl(registryBlockchain)

  const response = await fetch(url, { cache: "no-store" })

  if (!response.ok) {
    isloading = false
    throw new Error("Failed to fetch data")
  }

  let data: {
    datetime_utc: string
    activedids: string
  }[] = csv2json(await response.text())
  isloading = false

  return {
    AccountData: data.map((item) => [
      new Date(item.datetime_utc).getTime(),
      Number(item.activedids),
    ]),
    isloading: isloading,
  }
}

/**
 * Get the number of active DIDs on a given DID registry.
 *
 * @param registryBlockchain The blockchain of the DID registry.
 * @returns the number of active DIDs on this registry.
 */
export async function getActiveIdentitiesCount(
  registryBlockchain: BlockchainAnchor
) {
  let result: number
  try {
    // TODO: Replace by a fetch of https://data.verida.network/network/{blockchain}/stats ?
    result = await activeDIDCount(registryBlockchain)
  } catch (error) {
    throw new Error("Failed to fetch active identities count", {
      cause: error,
    })
  }

  if (result === undefined || result === null) {
    throw new Error("Failed to fetch active identities count")
  }

  return result
}

/**
 * Get the list of DIDs from a given DID registry.
 *
 * @param page The page number.
 * @param limit The number of DIDs per page.
 * @returns the list of DIDs.
 */
export async function getDids(
  registryBlockchain: BlockchainAnchor,
  page: number,
  limit: number
) {
  // TODO: Replace by fetching https://data.verida.network/network/{blockchain}/dids?limit=10&offset=20 ?
  const dids = await getDIDs(
    registryBlockchain,
    (page - 1) * limit,
    limit,
    true
  )

  // revert orders for `createdAt` desc
  return dids.reverse()
}

/**
 * Get an identity for a given DID
 *
 * @param did The DID of the identity
 * @returns The identity
 */
export async function getIdentity(did: string): Promise<Identity> {
  const [didDocumentResult, profileResult] = await Promise.allSettled([
    getDidDocument(did),
    getPublicProfile(did),
  ])

  if (
    didDocumentResult.status === "rejected" ||
    didDocumentResult.value === null
  ) {
    throw new Error("Failed to get DID document")
  }

  const didDocument = didDocumentResult.value

  let profile: Profile | null = null
  if (profileResult.status === "fulfilled" && profileResult.value !== null) {
    profile = profileResult.value
  }

  const identity: Identity = {
    did: did,
    createdAt: didDocument.created,
    didDocument,
    profile,
  }

  return identity
}
