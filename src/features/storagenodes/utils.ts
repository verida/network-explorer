import { clientEnvVars } from "@/config/client";
import { Network } from "@verida/types";

/**
 * Build the URL of the storage nodes registry file, based on the network.
 *
 * @param network the network to get the registry file URL for.
 * @returns the URL of the storage nodes registry file.
 */
export function getNodeRegistryUrl(network: Network) {
  return `https://assets.verida.io/registry/storageNodes/${network}.json`;
}

export function getNodeMetricsFileUrl(network: Network) {
  const resolvedNetwork = network === Network.MYRTLE ? "mainnet" : "testnet";

  return `${clientEnvVars.NEXT_PUBLIC_METRICS_BASE_URL}/nodes/${resolvedNetwork}-nodes-summary.json`;
}
