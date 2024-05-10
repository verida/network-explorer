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
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdTune } from "react-icons/md";
import SearchIcon from "@/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
import { cn, countriesWithCodes } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { registeredAtom } from "@/lib/atom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Close } from "@radix-ui/react-dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const regions = ["Africa", "Asia", "Australia", "Europe", "USA"];

const nodeFormSchema = z.object({
  operator_did: z.string(),
  public_key: z.string(),
  slots: z.number(),
  region: z.enum(["", ...regions]),
  countryCode: z.string(),
  endpoint_url: z.string().url(),
  datacenter: z.string(),
});

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

  const registered = useRecoilValue(registeredAtom);

  const form = useForm<z.infer<typeof nodeFormSchema>>({
    resolver: zodResolver(nodeFormSchema),
  });

  function onSubmit(values: z.infer<typeof nodeFormSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-[18px] leading-[20px]">
          {data.length} nodes
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className={cn(
              "bg-[#FFFFFF26] hover:bg-[#FFFFFF26] p-2 rounded-sm flex justify-start gap-1 transition-all duration-500",
              showSearchField ? "w-[200px]" : ""
            )}
            onClick={() => {
              setShowSearchField(true);
            }}
          >
            <SearchIcon />
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className="bg-[#FFFFFF26] hover:bg-current hover:opacity-50"
              >
                <MdTune color="white" size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="bg-[#333153] border-white/30 border rounded-3 w-[356px] p-0"
              align="end"
            >
              <div className="text-white font-semibold text-[14px] leading-[20px] py-3 px-6">
                Filters
              </div>
              <Separator className="bg-[#FFFFFF26] h-[1px]" />
              <div className="pt-1 pb-1">
                <div className="font-normal text-[14px] leading-[20px] text-white/60 py-2 px-6">
                  Region
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="all" />
                  <span>All</span>
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="australia" />
                  <span>Australia</span>
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="europe" />
                  <span>Europe</span>
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="usa" />
                  <span>USA</span>
                </div>
              </div>

              <div className="pb-1">
                <div className="font-normal text-[14px] leading-[20px] text-white/60 py-2 px-6">
                  Status
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="all" />
                  <span>All</span>
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="australia" />
                  <span>Active</span>
                </div>
                <div className="font-normal flex items-center gap-3 text-[14px] leading-[20px] text-white py-2 px-6 h-10">
                  <Checkbox id="europe" />
                  <span>Inactive</span>
                </div>
              </div>
              <SelectSeparator className="bg-[#FFFFFF26] h-[1px]" />
              <div className="w-full justify-end flex py-2 pr-4">
                <Button
                  disabled
                  className="rounded-sm py-2.5 px-6 w-[91px] h-10"
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {registered && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-[#19193D] bg-white font-semibold text-[14px] leading-[20px] py-2.5 px-6 rounded-sm w-[189px] h-10">
                    Register New Node
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[664px]">
                  <Close className="absolute right-4 top-4 transition-opacity hover:opacity-100 rounded-[100px] h-[30px] w-[30px]">
                    <X className="h-4 w-4 text-white m-auto" />
                  </Close>
                  <DialogTitle className="text-white text-center font-bold text-[18px] leading-[20px]">
                    Register a Node
                  </DialogTitle>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5 mt-2 px-2"
                    >
                      <FormField
                        control={form.control}
                        name="operator_did"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Node Operator DID</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-white/20 px-3 rounded-lg"
                                placeholder="did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="public_key"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Node Public Key</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-white/20 px-3 rounded-lg"
                                placeholder="12v63ZuXUvMF42ZFh1hPbGkfWB7DR7hCCpwA6NAiEQnbKKJH8fG"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="slots"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Slots</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-white/10 px-3 rounded-lg focus-visible:outline-1 border-white"
                                placeholder="Enter number of slots"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-4">
                        <FormField
                          control={form.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Region</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white/10">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {regions.map((region) => (
                                    <SelectItem
                                      key={region}
                                      value={region}
                                      useCheckmark={false}
                                    >
                                      {region}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Country Code</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-white/10">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countriesWithCodes.map((countryCode) => (
                                    <SelectItem
                                      key={countryCode.code}
                                      value={countryCode.code}
                                      useCheckmark={false}
                                    >
                                      {`${countryCode.country} (${countryCode.code})`}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="endpoint_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endpoint URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-white/10 px-3 rounded-lg\"
                                placeholder="Enter your URL"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Datacenter</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white/10">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Data center 1", "Datacenter 2"].map(
                                  (datacenter) => (
                                    <SelectItem
                                      key={datacenter}
                                      value={datacenter}
                                      useCheckmark={false}
                                    >
                                      {datacenter}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-3">
                        <Button className="py-2.5 px-6 rounded-lg bg-white/15 h-[48px] w-[98px]">
                          Cancel
                        </Button>
                        <Button
                          className="bg-white text-black py-[14px] px-6 rounded-lg h-[48px] w-[116px] disabled:opacity-30"
                          disabled={!form.formState.isValid}
                          type="submit"
                        >
                          Continue
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
      <div className="border border-white/20 rounded-lg overflow-hidden">
        <Table className="min-w-[70rem]">
          <TableHeader className="bg-[#FFFFFF0A] ">
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
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
