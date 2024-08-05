import { BlockchainAnchor } from "@verida/types"

import { clientEnvVars } from "@/config/client"
import { csv2json } from "@/features/metrics/utils"

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
