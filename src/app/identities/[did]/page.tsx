"use client"

import { notFound } from "next/navigation"
import React, { useMemo } from "react"

import { IdentityPageContent } from "@/app/identities/[did]/_components/identity-page-content"
import { Loading } from "@/components/common/loading"
import { isValidVeridaDid } from "@/features/did/utils"
import { useIdentity } from "@/features/identities/hooks/useIdentity"
import { didRegistryBlockchain } from "@/features/identities/utils.common"

type IdentityPageProps = {
  params: {
    did: string
  }
}

export default function IdentityPage(props: IdentityPageProps) {
  const { params } = props
  const { did: encodedDid } = params
  const did = useMemo(() => decodeURIComponent(encodedDid), [encodedDid])

  const isValidDid = useMemo(() => {
    return isValidVeridaDid(didRegistryBlockchain, did)
  }, [did])

  const { identity, isLoading, isError, error } = useIdentity({
    didRegistryBlockchain,
    did,
  })

  if (!isValidDid) {
    throw new Error("Invalid DID")
  }

  if (identity) {
    return <IdentityPageContent identity={identity} />
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-row items-center justify-center">
        <Loading>Getting identity information...</Loading>
      </div>
    )
  }

  if (isError) {
    throw new Error("Error getting the identity", {
      cause: error,
    })
  }

  notFound()
}
