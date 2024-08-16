"use client"

import { notFound } from "next/navigation"
import React, { useMemo } from "react"

import { NodePageContent } from "@/app/nodes/details/[nodeId]/_components/node-page-content"
import { Loading } from "@/components/common/loading"
import { clientEnvVars } from "@/config/client"
import { useStorageNode } from "@/features/storagenodes/hooks/useStorageNode"

type NodeDetailsPageProps = {
  params: {
    nodeId: string
  }
}

export default function NodeDetailsPage(props: NodeDetailsPageProps) {
  const { params } = props
  const { nodeId: encodedNodeId } = params
  const nodeId = useMemo(
    () => decodeURIComponent(encodedNodeId),
    [encodedNodeId]
  )

  const { storageNode, isLoading, isError, error } = useStorageNode({
    nodeId,
    network: clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK,
  })

  if (storageNode) {
    return <NodePageContent node={storageNode} />
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-row items-center justify-center">
        <Loading>Getting node information...</Loading>
      </div>
    )
  }

  if (isError) {
    throw new Error("Error getting the node", {
      cause: error,
    })
  }

  notFound()
}
