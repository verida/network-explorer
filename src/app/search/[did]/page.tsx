"use client"

import { useParams } from "next/navigation"
import React from "react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { useQuery } from "react-query"

import SearchIcon from "@/assets/icons/search.svg"
import Loader from "@/components/common/loader"
import ResultBox from "@/components/search/ResultBox"
import { useToast } from "@/components/ui/use-toast"
import { client as veridaClient } from "@/features/verida/client"
import { getAnyPublicProfile } from "@/features/verida/utils"

const SearchPage = () => {
  const [searchBoxVisible, setSearchBoxVisible] = useState(true)
  const params = useParams()
  const did = decodeURIComponent(params.did as unknown as string)

  const { toast } = useToast()

  const { data: profile, isLoading } = useQuery(
    ["accounts", did],
    async () => {
      return await getAnyPublicProfile(veridaClient, did)
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: params.did !== undefined,
      onError: () => {
        toast({
          variant: "destructive",
          description: "Failed to fetch profile",
        })
      },
    }
  )

  return (
    params.did &&
    (isLoading ? (
      <div className="flex h-full flex-row items-center justify-center">
        <Loader isLoading={isLoading} />
      </div>
    ) : profile ? (
      <div className="flex flex-col gap-10">
        {searchBoxVisible && (
          <div className="network-search flex h-[64px] items-center gap-2 rounded-lg border border-border-60 px-4 py-2">
            <SearchIcon />
            <div className="w-full truncate text-[16px] font-normal sm:border-none">
              {did}
            </div>
            <IoMdClose
              className="h-5 w-5 cursor-pointer text-foreground"
              onClick={() => setSearchBoxVisible(false)}
            />
          </div>
        )}
        <ResultBox profile={profile} />
      </div>
    ) : null) // TODO: Handle not found
  )
}

export default SearchPage
