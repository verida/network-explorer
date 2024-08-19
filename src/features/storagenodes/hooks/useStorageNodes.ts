import { useQuery } from "@tanstack/react-query"
import { Network } from "@verida/types"

import { getStorageNodes } from "@/features/storagenodes/utils"

export function useStorageNodes({ network }: { network: Network }) {
  const { data, ...query } = useQuery({
    queryKey: ["nodes", network],
    queryFn: async () => getStorageNodes(network),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    meta: {
      logCategory: "StorageNodes",
    },
  })

  return {
    storageNodes: data,
    ...query,
  }
}
