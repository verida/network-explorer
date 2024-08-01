import { BlockchainAnchor } from "@verida/types"
import { getResolver } from "@verida/vda-did-resolver"
import { Resolver } from "did-resolver"

import { clientEnvVars } from "@/config/client"
import { DidDocument } from "@/features/did/types"
import { Logger } from "@/features/logger"

const logger = Logger.create("DID")

const vdaDidResolver = getResolver({
  rpcUrl: clientEnvVars.NEXT_PUBLIC_VERIDA_RPC_URL,
})
const didResolver = new Resolver(vdaDidResolver)

export const VERIDA_POLAMOY_DID_REGEXP = /did:vda:polamoy:0x[0-9a-fA-F]{40}/

export const VERIDA_POLPOS_DID_REGEXP =
  /did:vda:(polpos|mainnet):0x[0-9a-fA-F]{40}/

/**
 * Check if a string value is a valid Verida DID.
 *
 * @param didRegistryBlockchain The blockchain anchor to check against.
 * @param did The DID or value to test.
 * @returns `true` if a valid Verida DID, `false` otherwise.
 */
export function isValidVeridaDid(
  didRegistryBlockchain: BlockchainAnchor,
  did: string
): boolean {
  switch (didRegistryBlockchain) {
    case BlockchainAnchor.POLPOS: {
      return VERIDA_POLPOS_DID_REGEXP.test(did)
    }
    case BlockchainAnchor.POLAMOY: {
      return VERIDA_POLAMOY_DID_REGEXP.test(did)
    }
    default: {
      return false
    }
  }
}

export function extractAndShortenAddress(did: string): string {
  // Split the DID string by colons
  const parts = did.split(":")

  // Check if the DID is in the expected format
  if (parts.length === 4 && parts[0] === "did" && parts[1] === "vda") {
    const address = parts[3]
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  } else {
    throw new Error("Invalid DID format")
  }
}

/**
 * Get the DID document of a DID.
 *
 * Doesn't throw errors, if the DID document is not found return null.
 *
 * @param didRegistryBlockchain The blockchain anchor of the DID registry.
 * @param did The DID.
 * @returns The DID document.
 */
export async function getDidDocument(
  didRegistryBlockchain: BlockchainAnchor,
  did: string
): Promise<DidDocument | null> {
  const isValid = isValidVeridaDid(didRegistryBlockchain, did)
  if (!isValid) {
    throw new Error("Invalid DID")
  }

  try {
    const response = await didResolver.resolve(did)
    return response.didDocument as DidDocument | null
  } catch (error) {
    logger.error(error)
    return null
  }
}
