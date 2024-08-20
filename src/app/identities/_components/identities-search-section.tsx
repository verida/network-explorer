import React from "react"

import { IdentitySearchInput } from "@/app/identities/_components/identity-search-input"
import SearchAccountIllustration from "@/assets/svg/search-account.svg"

export function IdentitiesSearchSection() {
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
          <IdentitySearchInput />
        </div>
      </div>
      <div className="hidden md:block">
        <SearchAccountIllustration width="100%" height="100%" />
      </div>
    </div>
  )
}
