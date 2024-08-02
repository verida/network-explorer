"use client"

import { Close } from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useState } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { LuArrowLeft } from "react-icons/lu"
import { useRecoilValue } from "recoil"

import { CopyToClipboardButton } from "@/components/common/CopyToClipboardButton"
import ConnectedContent from "@/components/common/connected-content"
// import { nodes } from "@/lib/sample";
import DataTable, { Tab } from "@/components/common/table"
import HubError from "@/components/nodes/nodehub/hub/hub-error"
import CreateNodeForm from "@/components/nodes/nodehub/hub/hub-form"
import HubLoading from "@/components/nodes/nodehub/hub/hub-loading"
import HubStake from "@/components/nodes/nodehub/hub/hub-stake"
import HubSuccess from "@/components/nodes/nodehub/hub/hub-success"
import { columns } from "@/components/nodes/nodelist/column"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { setupWizardAtom, userAtom } from "@/lib/atom"

const Operator = () => {
  const router = useRouter()

  const user = useRecoilValue(userAtom)
  const [nodeDialogOpen, setNodeDialogOpen] = useState(false)
  const [tab, setTab] = useState<Tab>("form")
  const setupWizard = useRecoilValue(setupWizardAtom)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  return (
    <div className="mb-10 mt-8 flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <FaChevronLeft
          onClick={() => {
            router.back()
          }}
          className="cursor-pointer"
        />
        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:justify-normal">
          <div className="text-[24px] font-bold leading-[28.8px]">Operator</div>
          <div className="flex items-center gap-2.5 rounded bg-white/10 px-2 py-1.5 text-[14px] font-normal leading-[20px] text-muted-foreground">
            <div className="max-w-[150px] truncate sm:max-w-max">
              did:vda:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55
            </div>
            <CopyToClipboardButton
              content="did:vda:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55"
              successMessage="DID copied!"
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
              <Button className="h-10 w-[188px] rounded-sm bg-white/15 px-6 py-2.5 text-[14px] font-semibold leading-[20px] text-foreground">
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
                    <DialogTitle className="flex w-full items-center justify-between text-[18px] font-bold leading-[20px] text-foreground">
                      <>
                        {tab === "form" && <div></div>}
                        {(tab === "stake" || tab === "connected") && (
                          <LuArrowLeft
                            onClick={() => {
                              setNodeDialogOpen(false)
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
                            <X className="m-auto h-4 w-4 text-foreground" />
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
      />
    </div>
  )
}

export default Operator
