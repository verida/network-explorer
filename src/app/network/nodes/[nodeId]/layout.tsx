import React from "react"

import { PageLayoutWrapper } from "@/components/common/page-layout-wrapper"

type NodeLayoutProps = {
  children: React.ReactNode
  params: {
    nodeId: string
  }
}

export default function NodeLayout(props: NodeLayoutProps) {
  const { children, params } = props
  const { nodeId: encodedNodeId } = params
  const nodeId = decodeURIComponent(encodedNodeId)

  return (
    <PageLayoutWrapper title="Node" titleComplement={nodeId}>
      {children}
    </PageLayoutWrapper>
  )
}
