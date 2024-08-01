import { Client } from "@verida/client-ts"

import { Identity } from "@/features/identities/types"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { Profile } from "@/features/verida/types"

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
    // TODO: Replace by fetching https://data.verida.network/... ?
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
