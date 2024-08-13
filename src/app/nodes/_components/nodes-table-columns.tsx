import { createColumnHelper } from "@tanstack/react-table"
import Link from "next/link"

import StorageIcon from "@/assets/icons/storage.svg"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { StorageNodeStatusBadge } from "@/components/nodes/storage-node-status-badge"
import { StorageNode } from "@/features/storagenodes/types"
import { sortNodeStatus } from "@/features/storagenodes/utils"

const columnHelper = createColumnHelper<StorageNode>()

export const nodesTableColumns = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Node" />
    ),
    enableSorting: true,
    sortUndefined: "last",
    sortingFn: "alphanumeric",
    enableColumnFilter: false,
    cell: (cellInfo) => (
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-foreground/20">
          <StorageIcon />
        </div>
        <Link
          href={`/nodes/details/${cellInfo.row.original.id}`}
          className="text-[14px] font-normal leading-[20px] text-accent"
        >
          {cellInfo.renderValue()}
        </Link>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.region, {
    id: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    enableSorting: true,
    sortUndefined: "last",
    sortingFn: "text",
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: (cellInfo) => cellInfo.getValue(),
  }),
  columnHelper.accessor((row) => row.storageSlotsUsed, {
    id: "storageSlots",
    enableSorting: true,
    sortUndefined: "last",
    enableColumnFilter: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Used/Total slots" />
    ),
    cell: (cellInfo) => (
      <div className="flex flex-row items-center gap-1">
        <span className="text-[14px] font-normal leading-[20px]">
          {cellInfo.row.original.storageSlotsUsed}
        </span>
        <span className="text-[14px] font-normal leading-[20px] text-muted-foreground">
          / {cellInfo.row.original.maxStorageSlots}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    sortUndefined: "last",
    sortingFn: (rowA, rowB) =>
      sortNodeStatus(rowA.original.status, rowB.original.status),
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: (cellInfo) => <StorageNodeStatusBadge status={cellInfo.getValue()} />,
  }),
]
