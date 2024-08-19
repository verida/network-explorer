"use client"

import { XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useMemo, useState } from "react"
import { useDebounce } from "use-debounce"

import SearchIcon from "@/assets/icons/search.svg"
import Avatar from "@/assets/svg/avatar.svg"
import { Loading } from "@/components/common/loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { isValidVeridaDid } from "@/features/did/utils"
import { DEFAULT_FOR_EMPTY_VALUE } from "@/features/identities/constants"
import { useIdentity } from "@/features/identities/hooks/useIdentity"
import { didRegistryBlockchain } from "@/features/identities/utils.common"
import { getIdentityPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type IdentitySearchInputProps = React.ComponentProps<typeof Input>

export function IdentitySearchInput(props: IdentitySearchInputProps) {
  const { ...inputProps } = props

  const [value, setValue] = useState("")

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setValue(event.target.value)
    }, [])

  const handleClearSearch = useCallback(() => {
    setValue("")
  }, [])

  const [debouncedSearchedDid] = useDebounce(value, 1000)

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
    return !!value
  }, [value])

  return (
    <Popover open={showResultPanel}>
      <PopoverAnchor>
        <Input
          {...inputProps}
          value={value}
          onChange={handleSearchInputChange}
          placeholder="Search by DID (did:vda:polpos:0x486e..644a55)"
          className={cn(
            "border-border px-4 py-4 pl-14 text-base hover:border-border/40",
            value ? "pr-14" : ""
          )}
          startAdornment={
            <SearchIcon className="ml-4 h-6 w-6" height="100%" width="100%" />
          }
          endAdornment={
            value ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="mr-2"
              >
                <XIcon className="h-6 w-6" />
              </Button>
            ) : undefined
          }
        />
      </PopoverAnchor>
      <PopoverContent
        collisionPadding={16}
        sideOffset={12}
        align="start"
        className="w-[--radix-popover-trigger-width] min-w-[--radix-popover-trigger-width] md:w-auto"
      >
        {identity ? (
          <Link
            href={getIdentityPageRoute({ did: identity.did })}
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
            <div className="flex flex-1 flex-col gap-1.5 truncate text-sm">
              <p className="truncate font-bold">
                {identity.profile?.name || DEFAULT_FOR_EMPTY_VALUE}
              </p>
              <p className="truncate font-normal">{identity.did}</p>
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
            <Loading>Searching identity...</Loading>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
