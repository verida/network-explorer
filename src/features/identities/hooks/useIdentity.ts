import { useQuery } from "@tanstack/react-query"
import { BlockchainAnchor } from "@verida/types"
import { useMemo } from "react"

import { isValidVeridaDid } from "@/features/did/utils"
import { getIdentity } from "@/features/identities/utils.client"

export function useIdentity({
  didRegistryBlockchain,
  did,
}: {
  didRegistryBlockchain: BlockchainAnchor
  did: string
}) {
  const isValid = useMemo(() => {
    return isValidVeridaDid(didRegistryBlockchain, did)
  }, [didRegistryBlockchain, did])

  const { data, ...other } = useQuery({
    enabled: isValid,
    queryKey: ["identities", did],
    queryFn: async () => getIdentity(didRegistryBlockchain, did),
    staleTime: 1000 * 60 * 60, // 60 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    meta: {
      logCategory: "Identities",
    },
  })

  return {
    identity: data,
    ...other,
  }
}
