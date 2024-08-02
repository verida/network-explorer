import { Logger } from "@/features/logger"
import { client } from "@/features/verida/client"
import { VERIDA_VAULT_CONTEXT_NAME } from "@/features/verida/constants"
import { Profile, ProfileDocument } from "@/features/verida/types"

const logger = Logger.create("Verida")

/**
 * Get the public profile of a Verida Identity.
 *
 * Doesn't throw errors, if the profile is not found return null.
 *
 * @param did A DID.
 * @returns The Verida Public Profile.
 */
export const getPublicProfile = async (
  did: string
): Promise<Profile | null> => {
  try {
    // TODO: Replace by fetching https://data.verida.network/... ?
    const profileDocument = (await client.getPublicProfile(
      did,
      VERIDA_VAULT_CONTEXT_NAME
    )) as ProfileDocument | undefined

    if (!profileDocument) {
      return null
    }

    const profile: Profile = {
      name: profileDocument.name,
      avatarUri: profileDocument.avatar?.uri,
      country: profileDocument.country,
      description: profileDocument.description,
    }

    return profile
  } catch (error) {
    logger.error(error)
    return null
  }
}
