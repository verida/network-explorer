"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

import CopyIcon from "@/assets/icons/copy.svg"
import Avatar from "@/assets/svg/avatar.svg"
import { useToast } from "@/components/ui/use-toast"
import { extractAndShortenAddress } from "@/features/did/utils"
import { DEFAULT_FOR_EMPTY_VALUE } from "@/features/identities/constants"
import { Identity } from "@/features/identities/types"

export const identitiesTableColumnsDef: ColumnDef<Identity>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-4 pl-6 text-[14px] font-normal leading-[20px]">
        {row.original.profile?.avatarUri ? (
          <Image
            src={row.original.profile.avatarUri}
            className="h-10 w-10 rounded-sm object-cover"
            alt="account-image"
            width={40}
            height={40}
          />
        ) : (
          <Avatar className="h-10 w-10" />
        )}
        <div>{row.original.profile?.name ?? DEFAULT_FOR_EMPTY_VALUE}</div>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      return row.original.profile?.country ?? DEFAULT_FOR_EMPTY_VALUE
    },
  },
  {
    accessorKey: "did",
    header: "DID",
    cell: ({ row }) => {
      // TODO: Extract the component to properly use the hook inside
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast()
      return (
        <div className="flex items-center gap-3 text-[14px] font-normal leading-[20px] text-accent-foreground">
          <Link href={`/identities/${row.original.did}`}>
            {extractAndShortenAddress(row.original.did)}
          </Link>
          <CopyIcon
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(row.getValue("did"))
              toast({
                description: "Identity's DID copied!",
              })
            }}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return row.original.profile?.description ?? DEFAULT_FOR_EMPTY_VALUE
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created on",
    cell: ({ row }) => {
      return row.original.createdAt
        ? dayjs(row.original.createdAt).format("MMM D, YYYY, h:mm A")
        : DEFAULT_FOR_EMPTY_VALUE
    },
  },
]
