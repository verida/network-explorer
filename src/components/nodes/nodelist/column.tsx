"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import StorageIcon from "@/assets/icons/storage.svg";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { FaEllipsis } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userAtom } from "@/lib/atom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WithdrawForm from "../nodehub/withdraw/withdraw-form";
import WithdrawSuccess from "../nodehub/withdraw/withdraw-success";
import { useState } from "react";
import WithdrawError from "../nodehub/withdraw/withdraw-error";
import { Close } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import HubLoading from "../nodehub/hub/hub-loading";
import UnStakeForm from "../nodehub/unstake/unstake-form";
import UnStakeSuccess from "../nodehub/unstake/unstake-success";
import { cn } from "@/lib/utils/utils";
import { Node } from "@/types/node";
import { Tab } from "@/components/common/table";

export const columns: ColumnDef<Node>[] = [
  {
    accessorKey: "name",
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
        <Link
          href={`/nodes/details/${row.original.id}`}
          className="text-[#8566F2] font-normal text-[14px] leading-[20px]"
        >
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },
  // {
  //   accessorKey: "operator",
  //   header: "Operator",

  //   cell: ({ row }) => (
  //     <Link
  //       href={`/nodes/operator/${row.getValue("operator")}`}
  //       className="text-[#8566F2] font-normal text-[14px] leading-[20px]"
  //     >
  //       {row.getValue("operator")}
  //     </Link>
  //   ),
  // },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent flex items-center gap-2 p-0"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Region</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => row.getValue("region"),
  },
  {
    accessorKey: "storageSlotsUsed",
    enableSorting: true,
    header: ({column}) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent flex items-center gap-2 p-0"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Available Slots</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span className="text-[14px] font-normal leading-[20px]">
          {row.original.storageSlotsUsed}&nbsp;
        </span>
        <span className="text-white/60 text-[14px] font-normal leading-[20px]">
          / {row.original.maxStorageSlots}
        </span>
      </div>
    ),
  },
  // {
  //   accessorKey: "failure_reports",
  //   header: "Failure Reports",
  // },
  // {
  //   accessorKey: "days_on_network",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       className="hover:bg-transparent flex items-center gap-2 p-0"
  //       onClick={() => {
  //         column.toggleSorting(column.getIsSorted() === "asc");
  //       }}
  //     >
  //       <span>Days on network</span>
  //       {column.getIsSorted() === "asc" ? (
  //         <FaCaretUp size={15} />
  //       ) : (
  //         <FaCaretDown size={15} />
  //       )}
  //     </Button>
  //   ),
  // },
  {
    accessorKey: "status",
    header: ({column}) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent flex items-center gap-2 p-0"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Status</span>
        {column.getIsSorted() === "asc" ? (
          <FaCaretUp size={15} />
        ) : (
          <FaCaretDown size={15} />
        )}
      </Button>
    ),
    enableSorting: true,
  
    cell: ({ row }) => (
      // <div
      //   className={`${
      //     row.getValue("status") === "Active"
      //       ? "bg-[#16A34A33] border-[#16A34A33]"
      //       : "bg-white/20 border-white/20"
      //   } w-fit border  py-1.5 px-3 rounded-[53px]`}
      // >
      //   {row.getValue("status")}
      // </div>

      <div className="bg-[#16A34A33] border-[#16A34A33] w-fit border  py-1.5 px-3 rounded-[53px]">
        Active
      </div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "date",
    header: "",
    cell: ({ row }) => {
      const user = useRecoilValue(userAtom);
      const [tab, setTab] = useState<Tab>("form");

      if (user.registered) {
        return (
          <Popover>
            <PopoverTrigger>
              <div className="min-w-[6rem] flex justify-end pr-3">
                <FaEllipsis size={20} />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="result-box border bg-[#333153] border-white/30 py-1 flex flex-col w-[200px]"
            >
              {row.getValue("status") === "Active" ? (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <div className="py-2 px-2 font-bold text-[14px] leading-[20px] text-white text-start">
                        Withdraw
                      </div>
                    </DialogTrigger>
                    <DialogContent
                      className={
                        tab === "success" || tab === "error"
                          ? "max-w-[440px]"
                          : "max-w-[664px]"
                      }
                    >
                      <Close className="absolute z-50 right-4 top-4 transition-opacity hover:opacity-100 rounded-[100px] h-[30px] w-[30px]">
                        <X className="h-4 w-4 text-white m-auto" />
                      </Close>
                      {tab === "form" ? (
                        <WithdrawForm setTab={setTab} />
                      ) : tab === "success" ? (
                        <WithdrawSuccess setTab={setTab} />
                      ) : (
                        <WithdrawError setTab={setTab} />
                      )}
                    </DialogContent>
                  </Dialog>
                  <div className="py-2 px-2 font-bold text-[14px] leading-[20px] text-white text-start">
                    Deposit
                  </div>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <div className="py-2 px-2 font-bold text-[14px] leading-[20px] text-white text-start">
                      Un-Stake
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[440px]">
                    {tab === "form" && (
                      <DialogTitle
                        className={cn(
                          "text-white font-bold text-[18px] leading-[20px] text-center"
                        )}
                      >
                        Un-Stake VDA
                      </DialogTitle>
                    )}
                    {tab !== "loading" && (
                      <Close className="absolute z-50 right-4 top-4 transition-opacity hover:opacity-100 rounded-[100px] h-[30px] w-[30px]">
                        <X className="h-4 w-4 text-white m-auto" />
                      </Close>
                    )}
                    {tab === "loading" ? (
                      <HubLoading />
                    ) : tab === "form" ? (
                      <UnStakeForm setTab={setTab} />
                    ) : (
                      <UnStakeSuccess />
                    )}
                  </DialogContent>
                </Dialog>
              )}
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
