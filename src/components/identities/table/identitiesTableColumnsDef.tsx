import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

import Avatar from "@/assets/svg/avatar.svg"
import { CopyToClipboardButton } from "@/components/common/CopyToClipboardButton"
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
      return (
        <div className="flex items-center gap-3 text-[14px] font-normal leading-[20px] text-accent-foreground">
          <Link href={`/identities/${row.original.did}`}>
            {extractAndShortenAddress(row.original.did)}
          </Link>
          <CopyToClipboardButton
            content={row.getValue("did")}
            successMessage="Identity's DID copied!"
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
