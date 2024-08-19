import { useQuery } from "@tanstack/react-query"
import { BlockchainAnchor } from "@verida/types"

import { getActiveIdentitiesCount } from "@/features/identities/utils.client"

export function useActiveIdentitiesCount(
  didRegistryBlockchain: BlockchainAnchor
) {
  const { data, ...other } = useQuery({
    queryKey: ["identities", didRegistryBlockchain, "activeDIDCount"],
    queryFn: async () => getActiveIdentitiesCount(didRegistryBlockchain),
    meta: {
      logCategory: "Identities",
    },
  })

  return {
    activeIdentitiesCount: data,
    ...other,
  }
}
