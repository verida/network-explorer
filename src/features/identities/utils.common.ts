import { BlockchainAnchor, Network } from "@verida/types"

import { clientEnvVars } from "@/config/client"

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
