import React from "react"

import { PageLayoutWrapper } from "@/components/common/page-layout-wrapper"

type IdentityLayoutProps = {
  children: React.ReactNode
}

export default function IdentityLayout(props: IdentityLayoutProps) {
  const { children } = props

  return <PageLayoutWrapper title="Identity">{children}</PageLayoutWrapper>
}
