"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useMemo, useState } from "react"
import { Oval } from "react-loader-spinner"
import { useDebounce } from "use-debounce"

import SearchIcon from "@/assets/icons/search.svg"
import Avatar from "@/assets/svg/avatar.svg"
import SearchAccountIllustration from "@/assets/svg/search-account.svg"
import { isValidVeridaDid } from "@/features/did/utils"
import { DEFAULT_FOR_EMPTY_VALUE } from "@/features/identities/constants"
import { useIdentity } from "@/features/identities/hooks/useIdentity"
import { didRegistryBlockchain } from "@/features/identities/utils"
import { cn } from "@/styles/utils"

export function IdentitiesSearchSection() {
  const [searchedDid, setSearchedDid] = useState("")
  // TODO: Add a button to clear the search input

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setSearchedDid(event.target.value)
    }, [])

  const [debouncedSearchedDid] = useDebounce(searchedDid, 1000)

  const { identity, isError } = useIdentity({
    didRegistryBlockchain,
    did: debouncedSearchedDid,
  })

  const isValidDid = useMemo(() => {
    if (debouncedSearchedDid === "") {
      return null
    }

    return isValidVeridaDid(didRegistryBlockchain, debouncedSearchedDid)
  }, [debouncedSearchedDid])

  const showResultPanel = useMemo(() => {
    return !!searchedDid
  }, [searchedDid])

  return (
    <div className="flex flex-row justify-between gap-3">
      <div className="flex w-full flex-1 flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-[2rem] font-bold leading-[3rem] sm:text-5xl sm:leading-[3.75rem]">
            Network Explorer
          </h1>
          <p className="text-sm font-light leading-normal tracking-[-3%] sm:text-lg">
            Search for an identity by its identifier (DID) to view its profile
            and DID document
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {/* TODO: Rework the search and search result */}
          <div className="rounded-lg border border-border bg-gradient-to-br from-foreground/10 from-5% to-foreground/5 to-95% p-4">
            <div className="flex w-full flex-row items-center gap-4">
              <SearchIcon className="h-6 w-6" />
              <input
                placeholder="Search by DID (did:vda:polpos:0x486e..644a55)"
                onChange={handleSearchInputChange}
                className="flex-1 truncate bg-transparent focus:border-none focus:outline-none"
                value={searchedDid}
              />
            </div>
          </div>
          <div
            className={cn(
              "rounded-lg border border-border-60 bg-[#333153] px-4 py-5 transition-all duration-150",
              showResultPanel ? "opacity-100" : "opacity-0"
            )}
          >
            {identity ? (
              <Link
                href={`/identities/${identity.did}`}
                className="flex flex-row items-center gap-4"
              >
                {identity.profile?.avatarUri ? (
                  <Image
                    src={identity.profile.avatarUri}
                    className="aspect-square w-[50px] rounded object-cover"
                    // TODO: Fix the sizing when reworking the whole search component
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar
                    className="aspect-square w-[50px]" // TODO: Fix the sizing when reworking the whole search component
                    width="100%"
                    height="100%"
                  />
                )}
                <div className="flex flex-1 flex-col gap-1.5 truncate">
                  <div className="truncate text-[14px] font-bold leading-[17.64px]">
                    {identity.profile?.name || DEFAULT_FOR_EMPTY_VALUE}
                  </div>
                  <div className="truncate text-[14px] font-normal leading-[17.64px]">
                    {identity.did}
                  </div>
                </div>
              </Link>
            ) : isError ? (
              <div>
                <p>Something went wrong searching for this DID</p>
              </div>
            ) : isValidDid === false ? (
              // TODO: To improve, not the best
              <div>
                <p>This DID is not valid</p>
              </div>
            ) : (
              <div className="flex w-full items-center justify-center">
                <Oval
                  visible={true}
                  height="50"
                  width="50"
                  color="#D9D9D9"
                  secondaryColor="rgb(217, 217,217,0.3)"
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <SearchAccountIllustration width="100%" height="100%" />
      </div>
    </div>
  )
}
