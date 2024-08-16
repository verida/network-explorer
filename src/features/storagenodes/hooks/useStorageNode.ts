import { Network } from "@verida/types"
import { useMemo } from "react"

import { useStorageNodes } from "@/features/storagenodes/hooks/useStorageNodes"

export function useStorageNode({
  nodeId,
  network,
}: {
  nodeId: string
  network: Network
}) {
  const { storageNodes, ...query } = useStorageNodes({ network })

  const storageNode = useMemo(() => {
    return storageNodes?.find((node) => node.id === nodeId)
  }, [storageNodes, nodeId])

  return {
    storageNode,
    ...query,
  }
}
