import { clientEnvVars } from "@/config/client";
import { Network } from "@verida/types";

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
  const resolvedNetwork = network === Network.MYRTLE ? "mainnet" : "testnet";

  return `${clientEnvVars.NEXT_PUBLIC_METRICS_BASE_URL}/network/${resolvedNetwork}/stats.csv`;
}
