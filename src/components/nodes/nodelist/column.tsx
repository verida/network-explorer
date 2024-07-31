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
        className="flex items-center gap-2 p-0 hover:bg-transparent"
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
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-foreground/20">
          <StorageIcon />
        </div>
        <Link
          href={`/nodes/details/${row.original.id}`}
          className="text-[14px] font-normal leading-[20px] text-accent-foreground"
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
        className="flex items-center gap-2 p-0 hover:bg-transparent"
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2 p-0 hover:bg-transparent"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Used/Total slots</span>
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
        <span className="text-[14px] font-normal leading-[20px] text-muted-foreground">
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2 p-0 hover:bg-transparent"
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
      //       : "bg-white/20 border-border"
      //   } w-fit border  py-1.5 px-3 rounded-[53px]`}
      // >
      //   {row.getValue("status")}
      // </div>

      <div className="w-fit rounded-[53px] border border-[#16A34A33] bg-[#16A34A33] px-3 py-1.5">
        Active
      </div>
    ),
  },
  {
    enableHiding: false,
    accessorKey: "date",
    header: "",
    cell: ({ row }) => {
      // TODO: Extract the component to properly use the hook inside
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const user = useRecoilValue(userAtom);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [tab, setTab] = useState<Tab>("form");

      if (user.registered) {
        return (
          <Popover>
            <PopoverTrigger>
              <div className="flex min-w-[6rem] justify-end pr-3">
                <FaEllipsis size={20} />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="result-box flex w-[200px] flex-col border border-border-30 bg-[#333153] py-1"
            >
              {row.getValue("status") === "Active" ? (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <div className="px-2 py-2 text-start text-[14px] font-bold leading-[20px] text-foreground">
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
                      <Close className="absolute right-4 top-4 z-50 h-[30px] w-[30px] rounded-[100px] transition-opacity hover:opacity-100">
                        <X className="m-auto h-4 w-4 text-foreground" />
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
                  <div className="px-2 py-2 text-start text-[14px] font-bold leading-[20px] text-foreground">
                    Deposit
                  </div>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <div className="px-2 py-2 text-start text-[14px] font-bold leading-[20px] text-foreground">
                      Un-Stake
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[440px]">
                    {tab === "form" && (
                      <DialogTitle
                        className={cn(
                          "text-center text-[18px] font-bold leading-[20px] text-foreground"
                        )}
                      >
                        Un-Stake VDA
                      </DialogTitle>
                    )}
                    {tab !== "loading" && (
                      <Close className="absolute right-4 top-4 z-50 h-[30px] w-[30px] rounded-[100px] transition-opacity hover:opacity-100">
                        <X className="m-auto h-4 w-4 text-foreground" />
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
