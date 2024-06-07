"use client";

import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { columns } from "@/components/nodes/nodelist/column";
import { nodes } from "@/lib/sample";
import DataTable, { Tab } from "@/components/common/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Close } from "@radix-ui/react-dialog";
import { LuArrowLeft } from "react-icons/lu";
import CreateNodeForm from "@/components/nodes/nodehub/hub/hub-form";
import HubStake from "@/components/nodes/nodehub/hub/hub-stake";
import HubLoading from "@/components/nodes/nodehub/hub/hub-loading";
import HubError from "@/components/nodes/nodehub/hub/hub-error";
import HubSuccess from "@/components/nodes/nodehub/hub/hub-success";
import ConnectedContent from "@/components/common/connected-content";
import { useRecoilValue } from "recoil";
import { setupWizardAtom, userAtom } from "@/lib/atom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Operator = () => {
  const { toast } = useToast();
  const router = useRouter();

  const user = useRecoilValue(userAtom);
  const [nodeDialogOpen, setNodeDialogOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("form");
  const setupWizard = useRecoilValue(setupWizardAtom);

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  return (
    <div className="mt-8 mb-10 flex flex-col gap-10">
      <div className="flex gap-4 items-center">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer"
        />
        <div className="flex gap-3 items-center sm:flex-nowrap flex-wrap sm:justify-normal justify-between w-full">
          <div className="text-[24px] font-bold leading-[28.8px]">Operator</div>
          <div className="bg-white/10 py-1.5 px-2 rounded text-white/60 font-normal text-[14px] leading-[20px] flex items-center gap-2.5">
            <div className="sm:max-w-max max-w-[150px] truncate">
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
      <DataTable
        columns={columns}
        data={nodes}
        title="nodes"
        additionalTitles={
          <>
            {setupWizard && (
              <Button className="bg-white/15 py-2.5 px-6 h-10 w-[188px] text-white rounded-sm font-semibold text-[14px] leading-[20px]">
                Node Setup Wizard
              </Button>
            )}
            {user.registered && (
              <>
                <Dialog open={nodeDialogOpen} onOpenChange={setNodeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="text-[#19193D] bg-white font-semibold text-[14px] leading-[20px] py-2.5 px-6 rounded-sm sm:w-[189px] w-[calc(100%-6rem)] h-10">
                      Register New Node
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={
                      tab === "form"
                        ? "max-w-[664px]"
                        : tab === "stake" ||
                          tab === "loading" ||
                          tab === "error" ||
                          tab === "success"
                        ? "max-w-[440px]"
                        : tab === "connected"
                        ? "max-w-[560px]"
                        : ""
                    }
                  >
                    <DialogTitle className="text-white font-bold text-[18px] leading-[20px] w-full flex items-center justify-between">
                      <>
                        {tab === "form" && <div></div>}
                        {(tab === "stake" || tab === "connected") && (
                          <LuArrowLeft
                            onClick={() => {
                              setNodeDialogOpen(false);
                            }}
                            className="ml-4"
                          />
                        )}
                        {tab === "form"
                          ? "Register a Node"
                          : tab === "stake" || tab === "connected"
                          ? "Stake VDA"
                          : ""}
                        {tab !== "loading" && (
                          <Close className="transition-opacity hover:opacity-100 rounded-[100px] sm:m-0 ml-auto">
                            <X className="h-4 w-4 text-white m-auto" />
                          </Close>
                        )}
                      </>
                    </DialogTitle>

                    {tab === "form" ? (
                      <CreateNodeForm setTab={setTab} />
                    ) : tab === "stake" ? (
                      <HubStake setTab={setTab} />
                    ) : tab === "loading" ? (
                      <HubLoading />
                    ) : tab === "success" ? (
                      <HubSuccess
                        setTab={setTab}
                        setNodeDialogOpen={setNodeDialogOpen}
                      />
                    ) : tab === "error" ? (
                      <HubError setTab={setTab} />
                    ) : tab === "connected" ? (
                      <ConnectedContent />
                    ) : (
                      <></>
                    )}
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        }
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        additionalFilters={
          <>
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
          </>
        }
      />
    </div>
  );
};

export default Operator;
