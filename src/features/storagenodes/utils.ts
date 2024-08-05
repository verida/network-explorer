import { Network } from "@verida/types"

import { clientEnvVars } from "@/config/client"

/**
 * Build the URL of the storage nodes registry file, based on the network.
 *
 * @param network the network to get the registry file URL for.
 * @returns the URL of the storage nodes registry file.
 */
export function getNodeRegistryUrl(network: Network) {
  return `https://assets.verida.io/registry/storageNodes/${network}.json`
}

/**
 * Build the URL of the storage nodes summary file, based on the network.
 *
 * @param network the network to get the nodes summary file URL for.
 * @returns the URL of the storage nodes summary file.
 */
export function getNodeMetricsFileUrl(network: Network) {
  // TODO: To rename to getNodeSummaryFileUrl
  return `${clientEnvVars.NEXT_PUBLIC_METRICS_BASE_URL}/nodes/${network}-nodes-summary.json`
}
