import { Network } from "@verida/types"
import { useQuery } from "react-query"

import { Logger } from "@/features/logger"
import { getStorageNodes } from "@/features/storagenodes/utils"

const logger = Logger.create("StorageNodes")

export function useStorageNodes({ network }: { network: Network }) {
  const { data, ...query } = useQuery(
    ["nodes", network],
    async () => {
      return getStorageNodes(network)
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: (error) => {
        logger.error(error)
      },
    }
  )

  return {
    storageNodes: data,
    ...query,
  }
}
