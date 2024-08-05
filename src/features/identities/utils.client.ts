import { BlockchainAnchor } from "@verida/types"
import { activeDIDCount, getDIDs } from "@verida/vda-did-resolver"

import { clientEnvVars } from "@/config/client"
import { getDidDocument } from "@/features/did/utils"
import { Identity } from "@/features/identities/types"
import { Profile } from "@/features/verida/types"
import { getPublicProfile } from "@/features/verida/utils"

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
    result = await activeDIDCount(
      registryBlockchain,
      clientEnvVars.NEXT_PUBLIC_VERIDA_RPC_URL
    )
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
    true,
    clientEnvVars.NEXT_PUBLIC_VERIDA_RPC_URL
  )

  // revert orders for `createdAt` desc
  return dids.reverse()
}

/**
 * Get an identity for a given DID
 *
 * @param registryBlockchain The blockchain of the DID registry
 * @param did The DID of the identity
 * @returns The identity
 */
export async function getIdentity(
  registryBlockchain: BlockchainAnchor,
  did: string
): Promise<Identity> {
  const [didDocumentResult, profileResult] = await Promise.allSettled([
    getDidDocument(registryBlockchain, did),
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
