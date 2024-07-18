"use client";

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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MdTune } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useSetRecoilState } from "recoil";
// import { showSearchBarAtom } from "@/lib/atom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
  });

  const [showSearchField, setShowSearchField] = useState(false);
  const pageLimits = [10, 20, 30];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    if (!isSmScreen) {
      setShowSearchField(false);
    } else {
      setShowSearch(false);
    }
  }, [isSmScreen]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold leading-[20px]">
          {data.length} Accounts
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className={cn(
              "flex justify-center gap-1 rounded-sm bg-[#FFFFFF26] p-2 transition-all duration-500 hover:bg-[#FFFFFF26]",
              showSearchField ? "w-[200px]" : ""
            )}
            onClick={() => {
              // if (isSmScreen) setShowSearchField(true);
              // else setShowSearch(true);
              // if (isSmScreen) setShowSearchField(true);
              // else setShowSearch(true);
            }}
          >
            <FiSearch color="white" size={20} />
            {showSearchField && (
              <>
                <Input
                  className="-mr-6 w-[90%] rounded-none border-none bg-transparent pl-0 text-white hover:bg-transparent focus-visible:ring-0"
                  value={
                    (table.getColumn("id")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("id")?.setFilterValue(event.target.value)
                  }
                />
              </>
            )}
          </Button>

          <Drawer
            onClose={() => {
              setDrawerOpen(false);
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
            <DrawerContent className="rounded-3 border border-white/30 bg-[#333153]">
              <div className="flex justify-between py-2 pl-3 text-[14px] font-semibold leading-[20px] text-white">
                <div>Filters</div>
                <X
                  className="mr-2 block h-5 w-5 cursor-pointer sm:hidden"
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                />
              </div>
              <Separator className="h-[1px] bg-[#FFFFFF26]" />
              <div className="pb-2 pl-2">
                <div className="px-2 py-2 text-[14px] font-normal leading-[20px] text-white/60">
                  Region
                </div>
                <div className="flex h-6 items-center gap-3 px-2 py-3.5 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="all" />
                  <span>All</span>
                </div>
                <div className="flex h-6 items-center gap-3 px-2 py-3.5 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="australia" />
                  <span>Australia</span>
                </div>
                <div className="flex h-6 items-center gap-3 px-2 py-3.5 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="europe" />
                  <span>Europe</span>
                </div>
                <div className="flex h-6 items-center gap-3 px-2 py-3.5 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="usa" />
                  <span>USA</span>
                </div>
              </div>
              <Separator className="h-[1px] bg-[#FFFFFF26]" />
              <div className="flex w-full justify-end py-2 pr-4">
                <Button disabled className="h-8 w-auto rounded-sm px-3">
                  Apply
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="hidden bg-[#FFFFFF26] hover:bg-current hover:opacity-50 sm:flex"
              >
                <MdTune color="white" size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="rounded-3 w-[356px] border border-white/30 bg-[#333153]"
              align="end"
            >
              <DropdownMenuLabel className="flex justify-between text-[14px] font-semibold leading-[20px] text-white">
                <div>Filters</div>
                <X
                  className="block h-5 w-5 cursor-pointer sm:hidden"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                />
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="h-[1px] bg-[#FFFFFF26]" />
              <DropdownMenuGroup className="pb-6 pt-4">
                <DropdownMenuLabel className="px-6 py-2 text-[14px] font-normal leading-[20px] text-white/60">
                  Region
                </DropdownMenuLabel>
                <DropdownMenuItem className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="all" />
                  <span>All</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="australia" />
                  <span>Australia</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="europe" />
                  <span>Europe</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
                  <Checkbox id="usa" />
                  <span>USA</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="h-[1px] bg-[#FFFFFF26]" />
              <div className="flex w-full justify-end py-2 pr-4">
                <Button
                  disabled
                  className="h-10 w-[91px] rounded-sm px-6 py-2.5"
                >
                  Apply
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/20">
        <Table className="min-w-[70rem]">
          <TableHeader className="bg-[#FFFFFF0A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "border-r border-white/10 md:border-none",
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
                  );
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
                        "border-r border-white/10 md:border-none",
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
                  className="h-[72px] py-4 pl-6 pr-4 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center sm:justify-between">
        <div className="hidden items-center gap-4 sm:flex">
          <div>Show rows</div>
          <Select>
            <SelectTrigger className="h-10 w-20 gap-1 rounded bg-white/15 py-2 pl-2.5 pr-1">
              <SelectValue placeholder={10} />
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
          <div className="text-[14px] font-normal leading-[20px] text-white/60">
            Page
          </div>
          <div className="flex items-center gap-3">
            <FaChevronLeft color="#FFFFFF99" className="cursor-pointer" />
            <div className="flex rounded bg-white/15 px-3 py-2.5 text-[14px] font-normal leading-[20px]">
              <div className="text-white">1</div>
              <div className="text-white/60">/4</div>
            </div>
            <FaChevronRight color="white" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}
