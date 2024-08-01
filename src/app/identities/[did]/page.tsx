"use client"

import { notFound } from "next/navigation"
import React, { useMemo } from "react"

import Loader from "@/components/common/loader"
import { IdentityPageContent } from "@/components/identities/IdentityPageContent"
import { useIdentity } from "@/features/identities/hooks/useIdentity"

type IdentityPageProps = {
  params: {
    did: string
  }
}

export default function IdentityPage(props: IdentityPageProps) {
  const { params } = props
  const { did: encodedDid } = params
  const did = useMemo(() => decodeURIComponent(encodedDid), [encodedDid])

  // TODO: Validate the DID

  const { identity, isLoading, isError, error } = useIdentity(did)

  if (identity) {
    return <IdentityPageContent identity={identity} />
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-row items-center justify-center">
        <Loader isLoading />
      </div>
    )
  }

  if (isError) {
    throw new Error("Error getting the identity", {
      cause: error,
    })
  }

  // TODO: To rework when the Identity gather profile and DID document
  notFound()
}
