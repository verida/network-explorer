"use client";

import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { columns } from "@/components/nodes/nodelist/column";
import { nodes } from "@/lib/sample";
import { DataTable } from "@/components/nodes/nodelist/data-table";

const Operator = () => {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div className="mt-8 mb-10 flex flex-col gap-10">
      <div className="flex gap-4 items-center">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer"
        />
        <div className="flex gap-3 items-center">
          <div className="text-[24px] font-bold leading-[28.8px]">Operator</div>
          <div className="bg-white/10 py-1.5 px-2 rounded text-white/60 font-normal text-[14px] leading-[20px] flex items-center gap-2.5">
            <div>
              did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55
            </div>
            <CopyIcon
              className="cursor-pointer scale-90"
              color="#FFFFFF99"
              onClick={() => {
                navigator.clipboard.writeText(
                  "did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55"
                );
                toast({
                  description: "Did Copied",
                });
              }}
            />
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={nodes} />
    </div>
  );
};

export default Operator;
