"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { MdTune } from "react-icons/md"
import { useMediaQuery } from "react-responsive"
import { useSetRecoilState } from "recoil"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { showSearchBarAtom } from "@/lib/atom"
import { screenSizes } from "@/lib/constants"
import { cn } from "@/lib/utils/utils"

import { Filter, Region, Status } from "../nodes/NodesList"
import Loader from "./loader"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title: string
  page: number
  limit: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setLimit: React.Dispatch<React.SetStateAction<number>>
  totalCount: number
  onApplyFilters: (filter?: Filter) => void
  showStatusFilters?: boolean
  showFilters?: boolean
  showSearch?: boolean
  additionalTitles?: JSX.Element
  isLoading?: boolean
}

export type Tab =
  | "form"
  | "stake"
  | "loading"
  | "error"
  | "success"
  | "connected"

const DataTable = <TData, TValue>({
  data,
  columns,
  additionalTitles,
  title,
  page,
  setLimit,
  limit,
  setPage,
  totalCount,
  onApplyFilters,
  showStatusFilters = false,
  showSearch = true,
  isLoading,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    pageCount: Math.ceil(totalCount / limit),
    manualPagination: true,
  })

  const [showSearchField, setShowSearchField] = useState(false)
  const pageLimits = [10, 20, 30]
  const isSmScreen = useMediaQuery({ query: `(max-width: ${screenSizes.sm})` })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const setShowSearch = useSetRecoilState(showSearchBarAtom)
  useEffect(() => {
    if (!isSmScreen) {
      setShowSearchField(false)
    } else {
      setShowSearch(false)
    }
  }, [isSmScreen, setShowSearch])

  const [filter, setFilter] = useState<Filter>()

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold capitalize leading-[20px]">
          {totalCount} {title}
        </div>
        {showSearch && (
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              className={cn(
                "flex justify-center gap-1 rounded-sm bg-[#FFFFFF26] p-2 transition-all duration-500 hover:bg-[#FFFFFF26]",
                showSearchField ? "w-[200px]" : ""
              )}
              onClick={() => {
                if (isSmScreen) setShowSearchField(true)
                else setShowSearch(true)
              }}
            >
              <FiSearch color="white" size={20} />
              {showSearchField && (
                <>
                  <Input
                    type="text"
                    className="-mr-6 w-[90%] rounded-none border-none bg-transparent pl-0 text-foreground hover:bg-transparent focus-visible:ring-0"
                    onChange={(event) =>
                      table.getColumn("did")?.setFilterValue(event.target.value)
                    }
                  />
                </>
              )}
            </Button>
            <Drawer
              onClose={() => {
                setDrawerOpen(false)
              }}
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
            >
              <DrawerTrigger asChild>
                <Button
                  size="icon"
                  className="flex bg-[#FFFFFF26] hover:bg-current hover:opacity-50 sm:hidden"
                >
                  <MdTune color="white" size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="rounded-3 border border-border-30 bg-[#333153]">
                <div className="flex justify-between py-2 pl-3 text-[14px] font-semibold leading-[20px] text-foreground">
                  <div>Filters</div>
                  <X
                    className="mr-2 block h-5 w-5 cursor-pointer sm:hidden"
                    onClick={() => {
                      setDrawerOpen(false)
                    }}
                  />
                </div>
                <DisplayFilters
                  showStatus={showStatusFilters}
                  filter={filter}
                  setFilter={setFilter}
                />
                <div className="flex w-full justify-end py-2 pr-4">
                  <DrawerClose asChild>
                    <Button
                      onClick={() => {
                        if (
                          filter?.regions[0] !== "All" ||
                          filter !== undefined
                        ) {
                          table
                            .getColumn("region")
                            ?.setFilterValue(filter?.regions[0])
                        }
                      }}
                      className="h-8 w-auto rounded-sm px-3"
                    >
                      Apply
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
            <DropdownMenu
              modal={false}
              onOpenChange={setDropdownOpen}
              open={dropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="hidden bg-[#FFFFFF26] hover:bg-current hover:opacity-50 sm:flex"
                >
                  <MdTune color="white" size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-3 w-screen border border-border-30 bg-[#333153] sm:w-[356px]"
                align="end"
              >
                <DropdownMenuLabel className="flex justify-between text-[14px] font-semibold leading-[20px] text-foreground">
                  <div>Filters</div>
                  <X
                    className="block h-5 w-5 cursor-pointer sm:hidden"
                    onClick={() => {
                      setDropdownOpen(false)
                    }}
                  />
                </DropdownMenuLabel>
                <DisplayFilters
                  filter={filter}
                  setFilter={setFilter}
                  showStatus={showStatusFilters}
                />
                <div className="flex w-full justify-end py-2 pr-4">
                  <Button
                    onClick={() => {
                      if (filter !== undefined) {
                        if (filter.regions[0] !== "All") {
                          table
                            .getColumn("region")
                            ?.setFilterValue(filter?.regions[0])
                        } else {
                          table.getColumn("region")?.setFilterValue("")
                        }
                      }
                      setDropdownOpen(false)
                      onApplyFilters(filter)
                    }}
                    className="h-8 w-auto rounded-sm px-3"
                  >
                    Apply
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {additionalTitles}
      </div>
      <div className="min-h-[18rem]">
        <div className={`overflow-hidden rounded-lg border border-border`}>
          <Table className="min-w-[68rem]">
            <TableHeader className="bg-[#FFFFFF0A]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "border-r border-border-10 md:border-none",
                          header.index === headerGroup.headers.length - 1 &&
                            "border-none"
                        )}
                      >
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
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "border-r border-border-10 md:border-none",
                          index === row.getVisibleCells().length - 1 &&
                            "border-none"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-[250px] py-4 pl-6 pr-4 text-center"
                  >
                    {isLoading ? (
                      <Loader isLoading={isLoading} className="h-[500px]" />
                    ) : (
                      "No results"
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <div>{isSmScreen ? "Rows" : "Show rows"}</div>
          <Select
            onValueChange={(value) => setLimit(parseInt(value as string))}
          >
            <SelectTrigger className="h-10 w-20 gap-1 rounded bg-white/15 py-2 pl-2.5 pr-1">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent>
              {pageLimits.map((pageAccount) => (
                <SelectItem value={pageAccount.toString()} key={pageAccount}>
                  {pageAccount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[14px] font-normal leading-[20px] text-muted-foreground">
            Page
          </div>
          <div className="flex items-center gap-3">
            <FaChevronLeft
              color="#FFFFFF99"
              className="cursor-pointer"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1)
                }
              }}
            />
            <div className="flex rounded bg-white/15 px-3 py-2.5 text-[14px] font-normal leading-[20px]">
              <div className="text-foreground">{page}</div>
              <div className="text-muted-foreground">
                /{Math.ceil(totalCount / limit)}
              </div>
            </div>
            <FaChevronRight
              color="white"
              className="cursor-pointer"
              onClick={() => {
                if (page < Math.ceil(totalCount / limit)) {
                  setPage(page + 1)
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const DisplayFilters = ({
  showStatus,
  filter,
  setFilter,
}: {
  showStatus: boolean
  filter?: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>
}) => {
  const statuses: Status[] = ["All", "Active", "Inactive"]
  const regions: Region[] = [
    "All",
    "Americas",
    "Oceania",
    "Europe",
    "Asia",
    "Africa",
  ]

  return (
    <>
      <Separator className="h-[1px] bg-[#FFFFFF26]" />
      <div className="pb-3 pl-2 pt-2">
        <div className="py-2 text-[14px] font-normal leading-[20px] text-muted-foreground">
          Region
        </div>
        <div className="mt-1 flex flex-col gap-2">
          {regions.map((region) => {
            return (
              <div
                key={region}
                className="flex items-center gap-3 px-2 py-1.5 text-[14px] font-normal leading-[20px] text-foreground"
              >
                <Checkbox
                  id={region.toLowerCase()}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => {
                      if (!prev) {
                        return { regions: [region], status: undefined }
                      }
                      if (checked) {
                        if (region === "All" || prev.regions.includes("All")) {
                          return { regions: [region], status: prev.status }
                        }
                        return {
                          ...prev,
                          regions: [region],
                        }
                      }
                      return {
                        ...prev,
                        regions: prev.regions.filter((r) => r !== region),
                      }
                    })
                  }}
                  checked={filter?.regions.includes(region)}
                />
                <label htmlFor={region.toLowerCase()}>{region}</label>
              </div>
            )
          })}
        </div>
      </div>
      {showStatus && (
        <div className="pb-1 pl-4">
          <div className="py-1.5 text-[14px] font-normal leading-[20px] text-muted-foreground">
            Status
          </div>
          {statuses.map((status) => {
            return (
              <div
                key={status}
                className="flex items-center gap-3 py-1.5 text-[14px] font-normal leading-[20px] text-foreground"
              >
                <Checkbox
                  id={"status-" + status.toLowerCase()}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => {
                      if (!prev) {
                        return { regions: [], status }
                      }
                      return { ...prev, status: checked ? status : undefined }
                    })
                  }}
                  checked={filter?.status === status}
                />
                <label htmlFor={"status-" + status.toLowerCase()}>
                  {status}
                </label>
              </div>
            )
          })}
        </div>
      )}
      <Separator className="h-[1px] bg-[#FFFFFF26]" />
    </>
  )
}

export default DataTable
