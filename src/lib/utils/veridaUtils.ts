import { Client } from "@verida/client-ts"
import { getResolver } from "@verida/vda-did-resolver"
import { Resolver } from "did-resolver"

import { clientEnvVars } from "@/config/client"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { Profile } from "@/features/verida/types"
import { Identity } from "@/types"

const vdaDidResolver = getResolver({
  rpcUrl: clientEnvVars.NEXT_PUBLIC_VERIDA_RPC_URL,
})
const didResolver = new Resolver(vdaDidResolver)

/**
 * Get the public profile of any Verida DID, if it exists.
 *
 * @param client A Verida client.
 * @param didOrUsername A username or DID.
 * @returns The Verida Public Profile.
 */
export const getAnyPublicProfile = async (
  client: Client,
  did: string
): Promise<Identity | undefined> => {
  try {
    const profileInstance = (await client.getPublicProfile(
      did,
      VERIDA_VAULT_CONTEXT_NAME
    )) as Profile | undefined

    if (!profileInstance) {
      throw new Error("No public profile exists for this did")
    }

    return {
      did: did,
      name: profileInstance.name || "--",
      avatarUri: profileInstance.avatar?.uri,
      country: profileInstance.country || "--",
      description: profileInstance.description || "--",
      createdAt: profileInstance.modifiedAt || "--",
    }
  } catch (error) {
    return
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
  const response = await didResolver.resolve(did)
  const didDocument = response.didDocument
  return didDocument
}
