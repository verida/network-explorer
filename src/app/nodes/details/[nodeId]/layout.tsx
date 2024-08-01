import React from "react"

import PageLayoutWrapper from "@/components/common/PageLayoutWrapper"

type NodeLayoutProps = {
  children: React.ReactNode
}

export default function NodeLayout(props: NodeLayoutProps) {
  const { children } = props

  return <PageLayoutWrapper title="Node">{children}</PageLayoutWrapper>
}
