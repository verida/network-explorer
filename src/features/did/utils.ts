import { getResolver } from "@verida/vda-did-resolver"
import { Resolver } from "did-resolver"

import { clientEnvVars } from "@/config/client"

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
 * @param did The DID.
 * @returns The DID document.
 * @throws Error if the DID document cannot be found.
 *
 */
export const getDidDocument = async (did: string) => {
  // TODO: Validate the DID
  const response = await didResolver.resolve(did)
  const didDocument = response.didDocument
  return didDocument
}
