"use client"

import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useCallback, useState } from "react"

import { identitiesTableColumns } from "@/app/identities/_components/identities-table-columns"
import { Loading } from "@/components/common/loading"
import { DataTableWrapper } from "@/components/datatable/data-table-wrapper"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { useActiveIdentitiesCount } from "@/features/identities/hooks/useActiveIdentitiesCount"
import { useIdentities } from "@/features/identities/hooks/useIdentities"
import { Identity } from "@/features/identities/types"
import { didRegistryBlockchain } from "@/features/identities/utils.common"
import { cn } from "@/styles/utils"

const numberFormatter = new Intl.NumberFormat(undefined)

const fallbackData: Identity[] = []

export function IdentitiesTable() {
  const { activeIdentitiesCount } = useActiveIdentitiesCount(
    didRegistryBlockchain
  )

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { identities, isLoading: isLoadingIdentities } = useIdentities({
    didRegistryBlockchain,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  })

  // TODO: Consider storing the pagination in the URL so it
  // can be shared but also find a way to retrieve them if they are not in the
  // URL, in the same session

  const getRowId = useCallback((identity: Identity) => identity.did, [])

  const table = useReactTable({
    data: identities ?? fallbackData,
    renderFallbackValue: EMPTY_VALUE_FALLBACK,
    columns: identitiesTableColumns,
    enableFilters: false,
    enableColumnFilters: false,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: activeIdentitiesCount,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <DataTableWrapper
      table={table}
      title={`${activeIdentitiesCount ? `${numberFormatter.format(activeIdentitiesCount)} ` : ""}Identities`}
      // Yes, if count is 0, "0" won't be displayed, on purpose
      hideFilters
    >
      <Table className="min-w-[68rem]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("border-border-10")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="h-64 py-4 pl-6 pr-4 text-center"
              >
                <div className="absolute left-1/2 top-[calc(16rem_/_2_+_3rem)] -translate-x-1/2 -translate-y-1/2">
                  {isLoadingIdentities ? (
                    <Loading>Getting identities...</Loading>
                  ) : (
                    "No identities"
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DataTableWrapper>
  )
}
