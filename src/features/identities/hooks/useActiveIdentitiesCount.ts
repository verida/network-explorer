import { useQuery } from "@tanstack/react-query"
import { BlockchainAnchor } from "@verida/types"

import { getActiveIdentitiesCount } from "@/features/identities/utils.client"

export function useActiveIdentitiesCount(
  didRegistryBlockchain: BlockchainAnchor
) {
  const { data, ...other } = useQuery({
    queryKey: ["identities", didRegistryBlockchain, "activeDIDCount"],
    queryFn: async () => getActiveIdentitiesCount(didRegistryBlockchain),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    meta: {
      logCategory: "Identities",
    },
  })

  return {
    activeIdentitiesCount: data,
    ...other,
  }
}
