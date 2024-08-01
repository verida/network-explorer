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
 * @param did The DID.
 * @returns The DID document.
 */
export async function getDidDocument(did: string): Promise<DidDocument | null> {
  // TODO: Validate the DID
  try {
    const response = await didResolver.resolve(did)
    return response.didDocument as DidDocument | null
  } catch (error) {
    logger.error(error)
    return null
  }
}
