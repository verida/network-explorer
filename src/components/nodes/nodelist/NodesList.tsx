"use client"

import { Close } from "@radix-ui/react-dialog"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { LuArrowLeft } from "react-icons/lu"
import { useRecoilValue } from "recoil"

import ConnectedContent from "@/components/common/connected-content"
import HubError from "@/components/nodes/nodehub/hub/hub-error"
import CreateNodeForm from "@/components/nodes/nodehub/hub/hub-form"
import HubLoading from "@/components/nodes/nodehub/hub/hub-loading"
import HubStake from "@/components/nodes/nodehub/hub/hub-stake"
import HubSuccess from "@/components/nodes/nodehub/hub/hub-success"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { clientEnvVars } from "@/config/client"
import { getNodeMetricsFileUrl } from "@/features/storagenodes/utils"
import { setupWizardAtom, userAtom } from "@/lib/atom"

import Loader from "../../common/loader"
import DataTable, { Tab } from "../../common/table"
import { Button } from "../../ui/button"
import { columns } from "./column"

/**
 * @deprecated to delete once everything in here as be refactored
 */
export type Region =
  | "All"
  | "Americas"
  | "Oceania"
  | "Asia"
  | "Europe"
  | "Africa"

/**
 * @deprecated to delete once everything in here as be refactored
 */
export type Status = "All" | "Active" | "Inactive"

/**
 * @deprecated to delete once everything in here as be refactored
 */
export interface Filter {
  regions: Region[]
  status?: Status
}

/**
 * @deprecated to delete once everything in here as be refactored
 */
const filterNodes = (nodes: any[], filter?: Filter) => {
  return nodes
    .filter((node) => {
      if (!filter || filter.regions.includes("All")) {
        return true
      }
      return filter.regions.includes(node.region)
    })
    .filter(() => {
      if (
        filter?.status === "All" ||
        filter?.status === "Active" ||
        !filter?.status
      ) {
        return true
      }
      // return node.status === filters.status;
      return false
    })
}

/**
 * @deprecated to delete once everything in here as be refactored
 */
const NodesList = () => {
  const user = useRecoilValue(userAtom)
  const [nodeDialogOpen, setNodeDialogOpen] = useState(false)
  const [tab, setTab] = useState<Tab>("form")
  const setupWizard = useRecoilValue(setupWizardAtom)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [nodes, setNodes] = useState<any[]>()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nodes"],
    queryFn: async () => {
      const url = getNodeMetricsFileUrl(
        clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
      )

      const response = await fetch(url)
      return await response.json()
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const [filter, setFilter] = useState<Filter>()

  useEffect(() => {
    setPage(1)
  }, [limit])

  useEffect(() => {
    if (data) {
      setNodes(filterNodes(data, filter))
    }
  }, [filter, data])

  if (isLoading) {
    return <Loader isLoading className="h-[300px]" />
  }

  if (isError) {
    return (
      <div>
        <p>There was an error fetching the nodes</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={nodes?.slice((page - 1) * limit, page * limit) ?? []}
        columns={columns}
        title="nodes"
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        totalCount={nodes?.length ?? 0}
        hideSearch
        onApplyFilters={(filter) => {
          setFilter(filter)
        }}
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
      />
    </div>
  )
}

export default NodesList
