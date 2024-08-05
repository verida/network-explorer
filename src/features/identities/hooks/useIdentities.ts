import { BlockchainAnchor } from "@verida/types"
import { useQuery, useQueryClient } from "react-query"

import { getDids, getIdentity } from "@/features/identities/utils.client"
import { Logger } from "@/features/logger"

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
  const queryClient = useQueryClient()

  const { data, ...other } = useQuery(
    ["identities", didRegistryBlockchain, page, limit],
    async () => {
      const dids = await getDids(didRegistryBlockchain, page, limit)

      const identitiesResult = await Promise.allSettled(
        dids.map(async (did: string) => getIdentity(didRegistryBlockchain, did))
      )

      const identities = identitiesResult
        .filter((result) => result.status === "fulfilled")
        .map((result) => {
          const identity = result.value
          queryClient.setQueryData(["identities", identity.did], identity)
          return identity
        })

      return identities
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
    ...other,
  }
}
