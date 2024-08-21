import { useQuery, useQueryClient } from "@tanstack/react-query"
import { BlockchainAnchor } from "@verida/types"

import { getDids, getIdentity } from "@/features/identities/utils.client"

export function useIdentities({
  didRegistryBlockchain,
  pageIndex,
  pageSize,
}: {
  didRegistryBlockchain: BlockchainAnchor
  pageIndex: number
  pageSize: number
}) {
  const queryClient = useQueryClient()

  const { data, ...other } = useQuery({
    queryKey: ["identities", didRegistryBlockchain, pageIndex, pageSize],
    queryFn: async () => {
      const dids = await getDids(didRegistryBlockchain, pageIndex, pageSize)

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
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    meta: {
      logCategory: "Identities",
    },
  })

  return {
    identities: data,
    ...other,
  }
}
