import { Client } from "@verida/client-ts";
import { BlockchainAnchor, DatastoreOpenConfig } from "@verida/types";
import {
  DID_METHOD,
  DID_VDA_METHOD,
  USERNAME_VDA_EXTENSION,
} from "@/lib/constants";
import { ResolvedIdentity } from "@/lib/types/verida";
import { getDIDs } from "@verida/vda-did-resolver";
import { Resolver } from "did-resolver";
import { getResolver } from "@verida/vda-did-resolver";
import { Identity } from "@/types";
import { Logger } from "@/features/logger";

const logger = Logger.create("Verida");

const vdaDidResolver = getResolver();
const didResolver = new Resolver(vdaDidResolver);
/**
 * Check if the param as a DID syntax, ie: starts with 'did:'.
 *
 * @param didOrUsername A username or DID.
 * @returns true if it has a DID syntax.
 */
export const hasDidSyntax = (didOrUsername: string) => {
  return didOrUsername.startsWith(DID_METHOD) ? true : false;
};

/**
 * Check if the param as a Verida DID syntax, ie: starts with 'did:vda:'.
 *
 * @param didOrUsername A username or DID.
 * @returns true if it has a Verida DID syntax.
 */
export const hasVeridaDidSyntax = (didOrUsername: string) => {
  return didOrUsername.startsWith(DID_VDA_METHOD) ? true : false;
};

/**
 * Check if the param as a Verida Username syntax, ie: ends with 'd.vda'.
 *
 * @param didOrUsername A username or DID.
 * @returns true if it has a Verida Username syntax.
 */
export const hasVeridaUsernameSyntax = (didOrUsername: string) => {
  // TODO: Check other rules if needed
  return didOrUsername.endsWith(USERNAME_VDA_EXTENSION) ? true : false;
};

/**
 * Resolve an identity by returning the Verida DID of a username, or itself if already a Verida DID.
 * Throw an Error if identity is an unsupported DID or if the username cannot be resolved (not found).
 *
 * Currently returns the username if mock data is enabled.
 *
 * @param client  A Verida client.
 * @param identity A username or DID.
 * @returns The resolved DID.
 */
export const resolveIdentity = async (
  client: Client,
  identity: string,
): Promise<ResolvedIdentity> => {
  // TODO: Remove use of mock data
  // if (config.isMockDataEnabled && identity === MOCK_IDENTITY) {
  //   return {
  //     username: MOCK_IDENTITY,
  //   };
  // }

  if (hasVeridaDidSyntax(identity)) {
    // Identity is considered a Verida DID.
    // "Considered" as in "valid VDA DID method", whether the DID actually exists is not a concern, it will be handled by catching the errors.
    try {
      const usernames = await client.getUsernames(identity);
      return {
        did: identity,
        username: usernames?.length > 0 ? usernames[0] : undefined,
        // TODO: Support multiple usernames
      };
    } catch (error: unknown) {
      // The errors won't say whether the DID exist or not, so gracefully return it with no usernames
      return { did: identity };
    }
  }

  // TODO: Handle case of username without extension, they should be considered Verida Username
  if (hasVeridaUsernameSyntax(identity)) {
    // Identity is considered a Verida Username.
    try {
      const did = await client.getDID(identity);
      return {
        did,
        username: identity,
      };
    } catch (error: unknown) {
      throw new Error("Cannot resolve the Verida Username");
    }
  }

  throw new Error("Unsupported DID or Username");
};

/**
 * Get the public profile of any Verida DID, if it exists.
 *
 * @param client A Verida client.
 * @param didOrUsername A username or DID.
 * @returns The Verida Public Profile.
 */
export const getAnyPublicProfile = async (
  client: Client,
  did: string,
): Promise<Identity | undefined> => {
  try {
    const profileInstance = await client.getPublicProfile(did, "Verida: Vault");

    for (const key in profileInstance) {
      if (profileInstance.hasOwnProperty(key)) {
        logger.debug(`${key}: ${profileInstance[key]}`);
      }
    }

    if (!profileInstance) {
      throw new Error("No public profile exists for this did");
    }

    return {
      name: profileInstance.hasOwnProperty("name")
        ? profileInstance["name"]
        : "--",
      did: did,
      avatarUri: profileInstance.hasOwnProperty("avatar")
        ? (profileInstance["avatar"] as { uri?: string })?.uri
        : undefined,
      country: profileInstance.hasOwnProperty("country")
        ? profileInstance["country"]
        : "--",
      description: profileInstance.hasOwnProperty("description")
        ? profileInstance["description"]
        : "--",
      createdAt: profileInstance.hasOwnProperty("modifiedAt")
        ? profileInstance["modifiedAt"]
        : "-- ",
    };
  } catch (error) {
    return;
  }
};

/**
 * Open an external context and a data store of this context.
 *
 * @param client A Verida client.
 * @param did A username or DID.
 * @param contextName The context name.
 * @param schemaUri The schema of the datastore.
 * @param datastoreConfig The optional configuration of the datastore.
 * @returns the Datastore if it exists
 */
export const getExternalDatastore = async (
  client: Client,
  didOrUsername: string,
  contextName: string,
  schemaUri: string,
  datastoreConfig: DatastoreOpenConfig = {},
) => {
  const context = await client.openExternalContext(contextName, didOrUsername);
  return await context.openExternalDatastore(
    schemaUri,
    didOrUsername,
    datastoreConfig,
  );
  // TODO: catch error and return a dedicated error (context not found, ...)
};

/**
 * Get the DIDs of a user.
 *
 * @param environment The environment.
 * @param page The page number.
 * @param limit The limit of DIDs per page.
 * @returns The DIDs.
 */
export const paginateDids = async (page: number, limit: number) => {
  // TODO: Get blockchain anchor dynamically from config
  return await getDIDs(BlockchainAnchor.POLPOS, page, limit);
};

/**
 * Get the DID document of a DID.
 *
 * @param did The DID.
 * @returns The DID document.
 * @throws Error if the DID document cannot be found.
 *
 */
export const getDidDocument = async (did: string) => {
  const response = await didResolver.resolve(did);
  const didDocument = response.didDocument;
  return didDocument;
};
