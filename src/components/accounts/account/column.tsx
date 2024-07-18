"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";
import { Account } from "@/types/account";

import { getDidDocument } from "@/lib/utils/veridaUtils";

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "user",
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-transparent"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Account Name</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4 pl-6 text-[14px] font-normal leading-[20px]">
        <img
          src={row.original?.avatarUri}
          className="h-10 w-10 rounded-sm object-cover"
          alt="account-image"
        />
        <div>{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "did",
    header: "Did",
    cell: ({ row }) => {
      const { toast } = useToast();
      return (
        <div className="flex items-center gap-3 text-[14px] font-normal leading-[20px] text-[#8566F2]">
          <div>{row.original.did}</div>
          <CopyIcon
            className="cursor-pointer"
            color="#8566F2"
            onClick={() => {
              navigator.clipboard.writeText(row.getValue("did"));
              toast({
                description: "Account did copied!!!",
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Bio",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2 p-0 hover:bg-transparent"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Date/time created</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      return dayjs(row.original.createdAt).format("MMM D, YYYY, h:mm A");
    },
  },
];
