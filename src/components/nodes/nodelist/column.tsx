"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import StorageIcon from "@/assets/icons/storage.svg";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QrIcon from "@/assets/svg/qrcode.svg";

export type Node = {
  id: number;
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
        className="hover:bg-transparent flex items-center gap-2"
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
      <Dialog>
        <DialogTrigger className="flex items-center gap-4">
          <div className="bg-white/20 w-10 h-10 rounded-sm items-center flex justify-center">
            <StorageIcon />
          </div>
          <span className="text-[#8566F2] font-normal text-[14px] leading-[20px]">
            {row.getValue("id")}
          </span>
        </DialogTrigger>
        <DialogContent className="w-[800px] max-w-[800px]">
          <div className="flex gap-3">
            <div className="flex flex-col">
              <div>
                Scan this QR code on your mobile phone to login or signup
              </div>
              <div>
                Already on your phone with Verida Wallet installed? Log in with
                Verida Wallet
              </div>
            </div>
            <QrIcon />
          </div>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "operator",
    header: "Operator",
    cell: ({ row }) => (
      <div className="text-[#8566F2] font-normal text-[14px] leading-[20px]">
        {row.getValue("operator")}
      </div>
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
    header: "Days on Network",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="bg-[#16A34A33] w-fit border border-[#16A34A33] py-1.5 px-3 rounded-[53px]">
        {row.getValue("status")}
      </div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "date",
    id: "date",
    header: "",
    cell: ({ row }) =>
      row.original.status == "Deregister" ? row.getValue("date") : <div></div>,
  },
];
