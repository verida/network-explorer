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
import { cn } from "@/lib/utils";
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
import { showSearchBarAtom } from "@/lib/atom";

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
  const pageAccounts = [10, 20, 30];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const setShowSearch = useSetRecoilState(showSearchBarAtom);
  useEffect(() => {
    if (!isSmScreen) {
      setShowSearchField(false);
    } else {
      setShowSearch(false);
    }
  }, [isSmScreen]);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-[18px] leading-[20px]">
          {data.length} Accounts
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className={cn(
              "bg-[#FFFFFF26] hover:bg-[#FFFFFF26] p-2 rounded-sm flex justify-center gap-1 transition-all duration-500",
              showSearchField ? "w-[200px]" : ""
            )}
            onClick={() => {
              // if (isSmScreen) setShowSearchField(true);
              // else setShowSearch(true);
            }}
          >
            <FiSearch color="white" size={20} />
            {showSearchField && (
              <>
                <Input
                  className="bg-transparent hover:bg-transparent border-none focus-visible:ring-0 rounded-none text-white pl-0 -mr-6 w-[90%]"
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
          <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="bg-[#FFFFFF26] hover:bg-current hover:opacity-50"
              >
                <MdTune color="white" size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#333153] border-white/30 border rounded-3 sm:w-[356px] w-screen"
              align="end"
            >
              <DropdownMenuLabel className="text-white font-semibold text-[14px] leading-[20px] flex justify-between">
                <div>Filters</div>
                <X
                  className="h-5 w-5 cursor-pointer sm:hidden block"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                />
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#FFFFFF26] h-[1px]" />
              <DropdownMenuGroup className="pt-4 pb-6">
                <DropdownMenuLabel className="font-normal text-[14px] leading-[20px] text-white/60 py-2 px-6">
                  Region
                </DropdownMenuLabel>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="all" />
                  <span>All</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="australia" />
                  <span>Australia</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="europe" />
                  <span>Europe</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="usa" />
                  <span>USA</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#FFFFFF26] h-[1px]" />
              <div className="w-full justify-end flex py-2 pr-4">
                <Button
                  disabled
                  className="rounded-sm py-2.5 px-6 w-[91px] h-10"
                >
                  Apply
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border border-white/20 rounded-lg overflow-hidden">
        <Table className="min-w-[70rem]">
          <TableHeader className="bg-[#FFFFFF0A] ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "md:border-none border-r border-white/10",
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
                        "md:border-none border-r border-white/10",
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
                  className="h-[72px] pl-6 py-4 pr-4 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center sm:justify-between items-center">
        <div className="sm:flex hidden items-center gap-4">
          <div>Show rows</div>
          <Select>
            <SelectTrigger className="w-20 h-10 py-2 pl-2.5 pr-1 gap-1 rounded bg-white/15">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent>
              {pageAccounts.map((pageAccount) => (
                <SelectItem value={pageAccount.toString()} key={pageAccount}>
                  {pageAccount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <div className="font-normal text-[14px] leading-[20px] text-white/60">
            Page
          </div>
          <div className="flex items-center gap-3">
            <FaChevronLeft color="#FFFFFF99" className="cursor-pointer" />
            <div className="flex text-[14px] font-normal leading-[20px] bg-white/15 rounded py-2.5 px-3">
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
