"use client"

import { notFound } from "next/navigation"
import React, { useEffect, useMemo } from "react"

import Loader from "@/components/common/loader"
import ResultBox from "@/components/search/ResultBox"
import { useToast } from "@/components/ui/use-toast"
import { useIdentityProfile } from "@/features/identities/hooks/useIdentityProfile"

type SearchPageProps = {
  params: {
    did: string
  }
}

export default function SearchPage(props: SearchPageProps) {
  const { params } = props
  const { did: encodedDid } = params
  const did = useMemo(() => decodeURIComponent(encodedDid), [encodedDid])

  const { toast } = useToast()

  // TODO: Validate the value before searching
  const { profile, isLoading, isError, error } = useIdentityProfile(did)

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        description: "Failed to fetch profile",
      })
    }
  }, [isError, toast])

  if (profile) {
    return <ResultBox profile={profile} />
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-row items-center justify-center">
        <Loader isLoading={isLoading} />
      </div>
    )
  }

  if (isError) {
    throw new Error("Error getting the identity profile", {
      cause: error,
    })
  }

  notFound()
}
