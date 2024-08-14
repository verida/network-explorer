import { Table } from "@tanstack/react-table"
import React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationCurrent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationSize,
  PaginationSizeValue,
} from "@/components/ui/pagination"

const defaultPaginationSizeValues: PaginationSizeValue[] = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
]

export type DataTablePaginationProps<TData> = {
  table: Table<TData>
  paginationSizes?: PaginationSizeValue[]
} & React.ComponentProps<"div">

export function DataTablePagination<TData>(
  props: DataTablePaginationProps<TData>
) {
  const {
    table,
    paginationSizes = defaultPaginationSizeValues,
    ...divProps
  } = props

  return (
    <div {...divProps}>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">Rows</p>
          <PaginationSize
            sizes={paginationSizes}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          />
        </div>
        <Pagination className="flex flex-row items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">Page</p>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationCurrent
                pageIndex={table.getState().pagination.pageIndex + 1}
                pageCount={table.getPageCount()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
