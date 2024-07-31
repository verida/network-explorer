"use client";

import { ColumnDef } from "@tanstack/react-table";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";
import { Account } from "@/types/account";
import Avatar from "@/assets/svg/avatar.svg";

import { extractAndShortenAddress } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-4 pl-6 text-[14px] font-normal leading-[20px]">
        {row.original?.avatarUri ? (
          <Image
            src={row.original?.avatarUri}
            className="h-10 w-10 rounded-sm object-cover"
            alt="account-image"
            width={40}
            height={40}
          />
        ) : (
          <Avatar className="h-10 w-10" />
        )}
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
    header: "DID",
    cell: ({ row }) => {
      // TODO: Extract the component to properly use the hook inside
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      return (
        <div className="flex items-center gap-3 text-[14px] font-normal leading-[20px] text-accent-foreground">
          <Link href={`/search/${row.original.did}`}>
            {extractAndShortenAddress(row.original.did)}
          </Link>
          <CopyIcon
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(row.getValue("did"));
              toast({
                description: "Identity's DID copied!",
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created on",
    cell: ({ row }) => {
      return dayjs(row.original.createdAt).format("MMM D, YYYY, h:mm A");
    },
  },
];
