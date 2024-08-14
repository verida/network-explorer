import { Column } from "@tanstack/react-table"
import React from "react"
import { FaCaretDown, FaCaretUp, FaSort } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  align?: "left" | "center" | "right"
} & React.ComponentProps<"div">

export function DataTableColumnHeader<TData, TValue>(
  props: DataTableColumnHeaderProps<TData, TValue>
) {
  const { column, title, align = "left", className, ...divProps } = props

  return (
    <div
      className={cn(
        "flex w-full flex-row",
        align === "right"
          ? "justify-end"
          : align === "center"
            ? "justify-center"
            : "justify-start",
        className
      )}
      {...divProps}
    >
      {!column.getCanSort() ? (
        <span>{title}</span>
      ) : (
        <Button
          variant="table-header"
          size="sm"
          className={cn(
            "flex h-8 gap-2",
            align === "right"
              ? "-mr-3 flex-row-reverse"
              : align === "center"
                ? "flex-row"
                : "-ml-3 flex-row"
          )}
          onClick={column.getToggleSortingHandler()}
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <FaCaretDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <FaCaretUp className="h-4 w-4" />
          ) : (
            <FaSort className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  )
}
