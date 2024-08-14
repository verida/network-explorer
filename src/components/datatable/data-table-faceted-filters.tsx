"use client"

import { Table } from "@tanstack/react-table"
import { MdTune } from "react-icons/md"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type DataTableFacetedFiltersProps<TData> = {
  table: Table<TData>
}

export function DataTableFacetedFilters<TData>(
  props: DataTableFacetedFiltersProps<TData>
) {
  const { table } = props

  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter())

  if (filterableColumns.length === 0) {
    return null
  }

  const hasFilterValue = filterableColumns.some((column) => {
    const filterValue = column.getFilterValue()
    return !!filterValue
  })

  return (
    <DropdownMenu>
      <div className="relative">
        {hasFilterValue ? (
          <div className="absolute right-0 top-0 size-3 -translate-y-1/3 translate-x-1/3 rounded-full bg-foreground" />
        ) : null}
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <MdTune className="h-5 w-5" />
            <span className="sr-only">Data table filters</span>
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end" className="min-w-64 p-0">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-0" />
        <div className="flex flex-col gap-4 py-4">
          {filterableColumns.map((column) => {
            const facets = Array.from(column.getFacetedUniqueValues().keys())
            const selectedValues = new Set(column.getFilterValue() as string[])

            return (
              <DropdownMenuGroup
                key={column.id}
                className="flex flex-col gap-0 px-0 py-0"
              >
                <span className="px-6 py-2 text-sm capitalize text-muted-foreground">
                  {column.id}
                </span>
                {facets.map((value) => {
                  const isSelected = selectedValues.has(value)

                  return (
                    <div
                      key={value}
                      className="flex flex-row items-center gap-3 px-6 py-2 text-sm"
                    >
                      <Checkbox
                        id={`${column.id}_${value}`}
                        checked={isSelected}
                        onCheckedChange={() => {
                          const currentFilterValue = selectedValues
                          if (isSelected) {
                            currentFilterValue.delete(value)
                          } else {
                            currentFilterValue.add(value)
                          }
                          const newFilterValue = Array.from(currentFilterValue)
                          column.setFilterValue(
                            newFilterValue.length ? newFilterValue : undefined
                          )
                        }}
                      />
                      <label
                        htmlFor={`${column.id}_${value}`}
                        className="capitalize"
                      >
                        {value}
                      </label>
                    </div>
                  )
                })}
              </DropdownMenuGroup>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
