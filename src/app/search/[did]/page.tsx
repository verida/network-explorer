"use client"

import { notFound } from "next/navigation"
import React, { useEffect, useMemo } from "react"

import Loader from "@/components/common/loader"
import { IdentityPageContent } from "@/components/identities/IdentityPageContent"
import { useToast } from "@/components/ui/use-toast"
import { useDidDocument } from "@/features/did/hooks/useDidDocument"
import { useIdentityProfile } from "@/features/identities/hooks/useIdentityProfile"

type IdentityPageProps = {
  params: {
    did: string
  }
}

export default function IdentityPage(props: IdentityPageProps) {
  const { params } = props
  const { did: encodedDid } = params
  const did = useMemo(() => decodeURIComponent(encodedDid), [encodedDid])

  const { toast } = useToast()

  // TODO: Validate the DID

  const {
    didDocument,
    isLoading: isLoadingDidDocument,
    isError: isErrorDidDocument,
    error: errorDidDocument,
  } = useDidDocument(did)

  useEffect(() => {
    if (isErrorDidDocument) {
      toast({
        variant: "destructive",
        description: "Failed to fetch the DID document",
      })
    }
  }, [isErrorDidDocument, toast])

  const {
    profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
    error: errorProfile,
  } = useIdentityProfile(did)

  useEffect(() => {
    if (isErrorProfile) {
      toast({
        variant: "destructive",
        description: "Failed to fetch the profile",
      })
    }
  }, [isErrorProfile, toast])

  if (didDocument && profile) {
    return (
      <IdentityPageContent
        did={did}
        profile={profile}
        didDocument={didDocument}
      />
    )
  }

  if (isLoadingDidDocument || isLoadingProfile) {
    return (
      <div className="flex h-full flex-row items-center justify-center">
        <Loader isLoading />
      </div>
    )
  }

  if (isErrorDidDocument) {
    throw new Error("Error getting the identity", {
      cause: errorDidDocument,
    })
  }

  if (isErrorProfile) {
    throw new Error("Error getting the identity", {
      cause: errorProfile,
    })
  }

  // TODO: To rework when the Identity gather profile and DID document
  notFound()
}
