import { createColumnHelper } from "@tanstack/react-table"

import StorageIcon from "@/assets/icons/storage.svg"
import { InternalLink } from "@/components/common/links"
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header"
import { StorageNodeStatusBadge } from "@/components/nodes/storage-node-status-badge"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { getNodePageRoute } from "@/features/routes/utils"
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
        <InternalLink
          href={getNodePageRoute({ nodeId: cellInfo.row.original.id })}
        >
          {cellInfo.renderValue()}
        </InternalLink>
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
    cell: (cellInfo) => cellInfo.renderValue(),
  }),
  columnHelper.accessor((row) => row.storageSlotsUsed, {
    id: "storageSlots",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Used / Total slots" />
    ),
    enableSorting: true,
    sortUndefined: "last",
    sortingFn: "alphanumeric",
    enableColumnFilter: false,
    cell: (cellInfo) => (
      <div className="flex flex-row items-center gap-1">
        <span className="text-[14px] font-normal leading-[20px]">
          {cellInfo.renderValue()}
        </span>
        <span className="text-[14px] font-normal leading-[20px] text-muted-foreground">
          / {cellInfo.row.original.maxStorageSlots ?? EMPTY_VALUE_FALLBACK}
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
