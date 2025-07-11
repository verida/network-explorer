import { Table } from "@tanstack/react-table"
import React from "react"

import { DataTableFacetedFilters } from "@/components/datatable/data-table-faceted-filters"
import { DataTablePagination } from "@/components/datatable/data-table-pagination"
import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type DataTableAction = {
  label: string | React.ReactNode
} & React.ComponentProps<typeof Button>

export type DataTableWrapperProps<TData> = {
  table: Table<TData>
  title?: string
  contentClassName?: Pick<React.ComponentProps<"div">, "className">
  actions?: DataTableAction[]
  hidePagination?: boolean
  hideFilters?: boolean
} & React.ComponentProps<"div">

export function DataTableWrapper<TData>(props: DataTableWrapperProps<TData>) {
  const {
    table,
    title,
    actions,
    children,
    contentClassName,
    hidePagination = false,
    hideFilters = false,
    ...divProps
  } = props

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <div>
            {title ? (
              <p className="text-lg font-semibold leading-5">{title}</p>
            ) : null}
          </div>
          <div className="flex flex-row items-center gap-3">
            {hideFilters ? null : <DataTableFacetedFilters table={table} />}
            {actions?.map(({ label, ...buttonProps }, index) => (
              <Button key={index} {...buttonProps}>
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className={cn(contentClassName)}>{children}</div>
        {hidePagination ? null : <DataTablePagination table={table} />}
      </div>
    </div>
  )
}
