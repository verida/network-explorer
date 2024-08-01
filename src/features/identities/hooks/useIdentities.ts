import { BlockchainAnchor } from "@verida/types"
import { useQuery } from "react-query"

import { getDids, getIdentity } from "@/features/identities/utils"
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
  const { data, ...other } = useQuery(
    ["identities", didRegistryBlockchain, page, limit],
    async () => {
      const dids = await getDids(didRegistryBlockchain, page, limit)

      const identitiesResult = await Promise.allSettled(
        dids.map(async (did: string) => getIdentity(didRegistryBlockchain, did))
      )

      const identities = identitiesResult
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value)

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
