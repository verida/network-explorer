import { BlockchainAnchor } from "@verida/types"
import { getDIDs } from "@verida/vda-did-resolver"
import { useQuery } from "react-query"

import { getDidDocument } from "@/features/did/utils"
import { Logger } from "@/features/logger"
import { client as veridaClient } from "@/features/verida/client"
import { getAnyPublicProfile } from "@/features/verida/utils"

const logger = Logger.create("Identities")

export function useIdentities({
  didRegistryBlockchain,
  limit,
  page,
}: {
  didRegistryBlockchain: BlockchainAnchor
  limit: number
  page: number
}) {
  const { data, isLoading, isError, ...other } = useQuery(
    ["identities", didRegistryBlockchain, page, limit],
    async () => {
      // TODO: Replace by fetching https://data.verida.network/network/{blockchain}/dids?limit=10&offset=20 ?
      let dids = await getDIDs(
        didRegistryBlockchain,
        (page - 1) * limit,
        limit,
        true
      )

      // revert orders for `createdAt` desc
      dids.reverse()

      const profiles = await Promise.all(
        dids.map(async (did: string) => {
          try {
            const didDocument = (await getDidDocument(did)) as any
            const profile = await getAnyPublicProfile(veridaClient, did)

            return {
              ...profile,
              did: did,
              createdAt: didDocument?.created,
            }
          } catch (error) {
            logger.error(
              new Error(`Failed to get profile for DID: ${did}`, {
                cause: error,
              })
            )
            return null // or handle the error as needed
          }
        })
      )

      return profiles.filter((profile) => !!profile)
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onError: (error) => {
        logger.error(error)
      },
    }
  )

  return {
    identities: data,
    isLoading,
    isError,
    ...other,
  }
}
