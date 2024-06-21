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
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
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
import { showSearchBarAtom } from "@/lib/atom";
import { Filter, Region, Status } from "../nodes/NodesList";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  onApplyFilters?: (filter?: Filter) => void;
  showStatusFilters?: boolean;
  additionalTitles?: JSX.Element;
}

export type Tab =
  | "form"
  | "stake"
  | "loading"
  | "error"
  | "success"
  | "connected";

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
}: DataTableProps<TData, TValue>) => {
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
    pageCount: Math.ceil(totalCount / limit),
    manualPagination: true,
  });

  const [showSearchField, setShowSearchField] = useState(false);
  const pageLimits = [10, 20, 30];
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const setShowSearch = useSetRecoilState(showSearchBarAtom);
  useEffect(() => {
    if (!isSmScreen) {
      setShowSearchField(false);
    } else {
      setShowSearch(false);
    }
  }, [isSmScreen]);

  const [filter, setFilter] = useState<Filter>();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-[18px] leading-[20px] capitalize">
          {totalCount} {title}
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className={cn(
              "bg-[#FFFFFF26] hover:bg-[#FFFFFF26] p-2 rounded-sm flex justify-center gap-1 transition-all duration-500",
              showSearchField ? "w-[200px]" : ""
            )}
            onClick={() => {
              if (isSmScreen) setShowSearchField(true);
              else setShowSearch(true);
            }}
          >
            <FiSearch color="white" size={20} />
            {showSearchField && (
              <>
                <Input
                  className="bg-transparent hover:bg-transparent border-none focus-visible:ring-0 rounded-none text-white pl-0 -mr-6 w-[90%]"
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
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
                className="bg-[#FFFFFF26] hover:bg-current hover:opacity-50 flex sm:hidden"
              >
                <MdTune color="white" size={20} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[#333153] border-white/30 border rounded-3">
              <div className="text-white font-semibold text-[14px] leading-[20px] flex justify-between py-2 pl-3">
                <div>Filters</div>
                <X
                  className="h-5 w-5 cursor-pointer sm:hidden block mr-2"
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                />
              </div>
              <DisplayFilters
                showStatus={showStatusFilters}
                filter={filter}
                setFilter={setFilter}
              />
              <div className="w-full justify-end flex py-2 pr-4">
                <Button
                  onClick={() => {
                    onApplyFilters && onApplyFilters(filter);
                  }}
                  className="rounded-sm px-3 w-auto h-8"
                >
                  Apply
                </Button>
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
                className="bg-[#FFFFFF26] hover:bg-current hover:opacity-50 sm:flex hidden"
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
              <DisplayFilters
                filter={filter}
                setFilter={setFilter}
                showStatus={showStatusFilters}
              />
              <div className="w-full justify-end flex py-2 pr-4">
                <Button
                  onClick={() => {
                    onApplyFilters && onApplyFilters(filter);
                  }}
                  className="rounded-sm py-2.5 px-6 w-[91px] h-10"
                >
                  Apply
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {additionalTitles}
      </div>
      <div className="min-h-[18rem]">
        <div className="border border-white/20 rounded-lg overflow-hidden">
          <Table className="min-w-[68rem]">
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
                    className="h-[250px] pl-6 py-4 pr-4 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-center sm:justify-between items-center">
        <div className="sm:flex hidden items-center gap-4">
          <div>Show rows</div>
          <Select
            onValueChange={(value) => setLimit(parseInt(value as string))}
          >
            <SelectTrigger className="w-20 h-10 py-2 pl-2.5 pr-1 gap-1 rounded bg-white/15">
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
        <div className="flex gap-2 items-center">
          <div className="font-normal text-[14px] leading-[20px] text-white/60">
            Page
          </div>
          <div className="flex items-center gap-3">
            <FaChevronLeft
              color="#FFFFFF99"
              className="cursor-pointer"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            />
            <div className="flex text-[14px] font-normal leading-[20px] bg-white/15 rounded py-2.5 px-3">
              <div className="text-white">{page}</div>
              <div className="text-white/60">
                /{Math.ceil(totalCount / limit)}
              </div>
            </div>
            <FaChevronRight
              color="white"
              className="cursor-pointer"
              onClick={() => {
                if (page < Math.ceil(totalCount / limit)) {
                  setPage(page + 1);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DisplayFilters = ({
  showStatus,
  filter,
  setFilter,
}: {
  showStatus: boolean;
  filter?: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}) => {
  const statuses: Status[] = ["All", "Active", "Inactive"];
  const regions: Region[] = [
    "All",
    "Americas",
    "Oceania",
    "Europe",
    "Asia",
    "Africa",
  ];
  return (
    <>
      <Separator className="bg-[#FFFFFF26] h-[1px]" />
      <div className="pt-2 pb-3 pl-2">
        <div className="font-normal text-[14px] leading-[20px] text-white/60 py-2">
          Region
        </div>
        <div className="flex flex-col gap-2 mt-1">
          {regions.map((region) => {
            return (
              <div
                key={region}
                className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-1.5 px-2"
              >
                <Checkbox
                  id={region.toLowerCase()}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => {
                      if (!prev) {
                        return { regions: [region], status: undefined };
                      }
                      if (checked) {
                        if (region === "All" || prev.regions.includes("All")) {
                          return { regions: [region], status: prev.status };
                        }
                        return {
                          ...prev,
                          regions: [...prev.regions, region],
                        };
                      }
                      return {
                        ...prev,
                        regions: prev.regions.filter((r) => r !== region),
                      };
                    });
                  }}
                  checked={filter?.regions.includes(region)}
                />
                <label htmlFor={region.toLowerCase()}>{region}</label>
              </div>
            );
          })}
        </div>
      </div>
      {showStatus && (
        <div className="pb-1 pl-4">
          <div className="font-normal text-[14px] leading-[20px] text-white/60 py-1.5">
            Status
          </div>
          {statuses.map((status) => {
            return (
              <div
                key={status}
                className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-1.5"
              >
                <Checkbox
                  id={"status-" + status.toLowerCase()}
                  onCheckedChange={(checked) => {
                    setFilter((prev) => {
                      if (!prev) {
                        return { regions: [], status };
                      }
                      return { ...prev, status: checked ? status : undefined };
                    });
                  }}
                  checked={filter?.status === status}
                />
                <label htmlFor={"status-" + status.toLowerCase()}>
                  {status}
                </label>
              </div>
            );
          })}
        </div>
      )}
      <Separator className="bg-[#FFFFFF26] h-[1px]" />
    </>
  );
};

export default DataTable;
