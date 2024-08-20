import { createColumnHelper } from "@tanstack/react-table"
import Image from "next/image"

import Avatar from "@/assets/svg/avatar.svg"
// TODO: Use a default avatar with no background
import { CopyToClipboardContent } from "@/components/common/copy-to-clipboard-content"
import { InternalLink } from "@/components/common/links"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { extractAndShortenAddress } from "@/features/did/utils"
import { Identity } from "@/features/identities/types"
import { getIdentityPageRoute } from "@/features/routes/utils"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
})

const columnHelper = createColumnHelper<Identity>()

export const identitiesTableColumns = [
  columnHelper.accessor((row) => row.profile?.name, {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Identity" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    cell: (cellInfo) => (
      <div className="flex flex-row items-center gap-4">
        {cellInfo.row.original.profile?.avatarUri ? (
          <Image
            src={cellInfo.row.original.profile.avatarUri}
            className="h-10 w-10 rounded-sm object-cover"
            alt="identity-avatar"
            width={40}
            height={40}
          />
        ) : (
          <Avatar className="h-10 w-10" />
        )}
        <div>{cellInfo.renderValue()}</div>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.profile?.country, {
    id: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    cell: (cellInfo) => cellInfo.renderValue(),
  }),
  columnHelper.accessor((row) => row.did, {
    id: "did",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DID" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    cell: (cellInfo) => (
      <CopyToClipboardContent
        content={cellInfo.row.original.did}
        successMessage="Identity's DID copied!"
      >
        <InternalLink
          href={getIdentityPageRoute({ did: cellInfo.row.original.did })}
        >
          {extractAndShortenAddress(cellInfo.row.original.did)}
        </InternalLink>
      </CopyToClipboardContent>
    ),
  }),
  columnHelper.accessor((row) => row.profile?.description, {
    id: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    cell: (cellInfo) => cellInfo.renderValue(),
  }),
  columnHelper.accessor((row) => row.createdAt, {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created on" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    cell: (cellInfo) => {
      const date = cellInfo.getValue()
      return date
        ? dateFormatter.format(new Date(date))
        : cellInfo.renderValue()
    },
  }),
]
