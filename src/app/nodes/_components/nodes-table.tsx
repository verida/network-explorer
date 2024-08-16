"use client"

import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useCallback, useState } from "react"

import { nodesTableColumns } from "@/app/nodes/_components/nodes-table-columns"
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
import { clientEnvVars } from "@/config/client"
import { useStorageNodes } from "@/features/storagenodes/hooks/useStorageNodes"
import { StorageNode } from "@/features/storagenodes/types"
import { cn } from "@/styles/utils"

const fallbackData: StorageNode[] = []

export function NodesTable() {
  const { storageNodes, isLoading: isFetchingNodes } = useStorageNodes({
    network: clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK,
  })

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  // TODO: Consider storing the sorting, filtering, pagination in the URL so it
  // can be shared but also find a way to retrieve them from one session to
  // another if they are not in the URL

  const getRowId = useCallback((node: StorageNode) => node.id, [])

  const table = useReactTable({
    data: storageNodes ?? fallbackData,
    columns: nodesTableColumns,
    state: {
      columnFilters,
      sorting,
    },
    enableFilters: true,
    enableColumnFilters: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <DataTableWrapper
      table={table}
      title={`${table.getFilteredRowModel().rows.length ? `${table.getFilteredRowModel().rows.length} ` : ""}Nodes`}
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
                  {isFetchingNodes ? (
                    <Loading>Getting nodes...</Loading>
                  ) : (
                    "No nodes"
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
