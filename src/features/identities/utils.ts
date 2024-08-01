import { BlockchainAnchor, Network } from "@verida/types"

import { clientEnvVars } from "@/config/client"
import { csv2json } from "@/features/metrics/utils"

/**
 * Build the URL of the identities stats file, based on the metrics base URL and the network.
 *
 * @returns the URL of the identities stats file.
 */
export function getIdentitiesStatsFileUrl(network: Network) {
  // Map the network to the path of the metrics file
  // Note 1: Since the protocol v4, the identities are not related to the Verida
  // Network, but we still use the asumption of a one-one mapping for now.
  // Note 2: The metrics endpoint is not up-to-date with the network names.
  const resolvedNetwork = network === Network.MYRTLE ? "mainnet" : "testnet"

  return `${clientEnvVars.NEXT_PUBLIC_METRICS_BASE_URL}/network/${resolvedNetwork}/stats.csv`
}

/**
 * Get the blockchain anchor for the DID registry for a given Verida network.
 *
 * NOTE: Since the protocol v4, the DID registry is no longer associated to the
 * Verida Network, but for the sake of simplicity we still use the assumption
 * of a one-one mapping.
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

export async function getIdentitiesStatsData(network: Network) {
  let isloading = true

  const url = getIdentitiesStatsFileUrl(network)

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
