"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import StorageIcon from "@/assets/icons/storage.svg";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { registeredAtom } from "@/lib/atom";
import { FaEllipsis } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type Node = {
  id: string;
  operator: string;
  slots: {
    count: number;
    total: number;
  };
  failure_reports: number;
  days_on_network: number;
  status: "Active" | "Deregister";
  date: string;
};

export const columns: ColumnDef<Node>[] = [
  {
    accessorKey: "id",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent flex items-center gap-2 p-0"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Node Name</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div className="bg-white/20 w-10 h-10 rounded-sm items-center flex justify-center">
          <StorageIcon />
        </div>
        <span className="text-[#8566F2] font-normal text-[14px] leading-[20px]">
          {row.getValue("id")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "operator",
    header: "Operator",

    cell: ({ row }) => (
      <Link
        href={`/nodes/operator/${row.getValue("operator")}`}
        className="text-[#8566F2] font-normal text-[14px] leading-[20px]"
      >
        {row.getValue("operator")}
      </Link>
    ),
  },
  {
    accessorKey: "slots",
    header: "Available Slots",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span className="text-[14px] font-normal leading-[20px]">
          {row.original.slots.count}&nbsp;
        </span>
        <span className="text-white/60 text-[14px] font-normal leading-[20px]">
          / {row.original.slots.total}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "failure_reports",
    header: "Failure Reports",
  },
  {
    accessorKey: "days_on_network",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent flex items-center gap-2 p-0"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Days on network</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("status") === "Active"
            ? "bg-[#16A34A33] border-[#16A34A33]"
            : "bg-white/20 border-white/20"
        } w-fit border  py-1.5 px-3 rounded-[53px]`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "date",
    header: "",
    cell: ({ row }) => {
      const registered = useRecoilValue(registeredAtom);
      if (registered) {
        return (
          <Popover >
            <PopoverTrigger>
              <div className="min-w-[6rem] flex justify-end pr-3">
                <FaEllipsis size={20} />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="result-box border bg-[#333153] border-white/30 py-1 flex flex-col w-[200px]">
              <div className="py-2 px-2 font-bold text-[14px] leading-[20px] text-white">Withdraw</div>
              <div className="py-2 px-2 font-bold text-[14px] leading-[20px] text-white">Deposit</div>
            </PopoverContent>
          </Popover>
        );
      }
      if (row.getValue("status") == "Deregister") {
        return row.getValue("date");
      }
    },
  },
];
