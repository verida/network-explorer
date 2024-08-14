import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/styles/utils"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-2", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationCurrentProps = {
  pageIndex: number
  pageCount: number
} & React.ComponentProps<"div">

const PaginationCurrent = React.forwardRef<
  HTMLDivElement,
  PaginationCurrentProps
>(({ pageCount, pageIndex, className, ...divProps }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row gap-1 rounded-sm bg-foreground/10 px-4 py-2.5 text-sm font-medium",
      className
    )}
    {...divProps}
  >
    <span>{pageIndex}</span>
    <span className="text-muted-foreground">{`/ ${pageCount}`}</span>
  </div>
))
PaginationCurrent.displayName = "PaginationCurrent"

type PaginationButtonProps = {
  isActive?: boolean
} & React.ComponentProps<typeof Button>

const PaginationButton = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    size={size}
    variant={isActive ? "outline" : "ghost"}
    className={cn(className)}
    {...props}
  />
)
PaginationButton.displayName = "PaginationButton"

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to first page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronFirst className="h-4 w-4" />
    <span className="sr-only">First</span>
  </PaginationButton>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous</span>
  </PaginationButton>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span className="sr-only">Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
)
PaginationNext.displayName = "PaginationNext"

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to last page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span className="sr-only">Last</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export type PaginationSizeValue = {
  value: string
  label: string
}

type PaginationSizeProps = {
  sizes: PaginationSizeValue[]
} & React.ComponentProps<typeof Select>

const PaginationSize = ({ sizes, ...selectProps }: PaginationSizeProps) => (
  <Select {...selectProps}>
    <SelectTrigger className="w-20">
      <SelectValue placeholder="Select" />
    </SelectTrigger>
    <SelectContent side="top">
      {sizes.map((size) => (
        <SelectItem key={size.value} value={size.value}>
          {size.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
PaginationSize.displayName = "PaginationSize"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationCurrent,
  PaginationButton,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PaginationSize,
}
