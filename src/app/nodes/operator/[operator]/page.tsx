"use client";

import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { columns } from "@/components/nodes/nodelist/column";
// import { nodes } from "@/lib/sample";
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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="mb-10 mt-8 flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer"
        />
        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:justify-normal">
          <div className="text-[24px] font-bold leading-[28.8px]">Operator</div>
          <div className="flex items-center gap-2.5 rounded bg-white/10 px-2 py-1.5 text-[14px] font-normal leading-[20px] text-white/60">
            <div className="max-w-[150px] truncate sm:max-w-max">
              did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55
            </div>
            <CopyIcon
              className="scale-90 cursor-pointer"
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
        data={[]}
        title="nodes"
        additionalTitles={
          <>
            {setupWizard && (
              <Button className="h-10 w-[188px] rounded-sm bg-white/15 px-6 py-2.5 text-[14px] font-semibold leading-[20px] text-white">
                Node Setup Wizard
              </Button>
            )}
            {user.registered && (
              <>
                <Dialog open={nodeDialogOpen} onOpenChange={setNodeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-10 w-[calc(100%-6rem)] rounded-sm bg-white px-6 py-2.5 text-[14px] font-semibold leading-[20px] text-[#19193D] sm:w-[189px]">
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
                    <DialogTitle className="flex w-full items-center justify-between text-[18px] font-bold leading-[20px] text-white">
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
                          <Close className="ml-auto rounded-[100px] transition-opacity hover:opacity-100 sm:m-0">
                            <X className="m-auto h-4 w-4 text-white" />
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
        totalCount={0}
        additionalFilters={
          <>
            <div className="pb-1">
              <div className="px-6 py-2 text-[14px] font-normal leading-[20px] text-white/60">
                Status
              </div>
              <div className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
                <Checkbox id="all" />
                <span>All</span>
              </div>
              <div className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
                <Checkbox id="australia" />
                <span>Active</span>
              </div>
              <div className="flex h-10 items-center gap-3 px-6 py-2 text-[14px] font-normal leading-[20px] text-white">
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
