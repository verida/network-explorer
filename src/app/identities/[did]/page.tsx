"use client"

import { notFound } from "next/navigation"
import React, { useMemo } from "react"

import Loader from "@/components/common/loader"
import { IdentityPageContent } from "@/components/identities/IdentityPageContent"
import { isValidVeridaDid } from "@/features/did/utils"
import { useIdentity } from "@/features/identities/hooks/useIdentity"
import { didRegistryBlockchain } from "@/features/identities/utils"

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
