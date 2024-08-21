import React from "react"

import { PageLayoutWrapper } from "@/components/common/page-layout-wrapper"

type IdentityLayoutProps = {
  children: React.ReactNode
  params: {
    did: string
  }
}

export default function IdentityLayout(props: IdentityLayoutProps) {
  const { children, params } = props
  const { did: encodedDid } = params
  const did = decodeURIComponent(encodedDid)

  return (
    <PageLayoutWrapper
      title="Identity"
      titleComplement={did}
      copyTitleComplementSuccessMessage="Identity's DID copied!"
    >
      {children}
    </PageLayoutWrapper>
  )
}
