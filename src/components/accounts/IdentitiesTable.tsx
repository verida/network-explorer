"use client"

import { getDIDs } from "@verida/vda-did-resolver"
import React, { useMemo, useState } from "react"
import { useQuery } from "react-query"

import { clientEnvVars } from "@/config/client"
import { useActiveDIDCount } from "@/features/identities/hooks/useActiveDIDCount"
import { Identity } from "@/features/identities/types"
import { getDidRegistryBlockchainForNetwork } from "@/features/identities/utils"
import { Logger } from "@/features/logger"
import { client as veridaClient } from "@/features/verida/client"
import { getAnyPublicProfile, getDidDocument } from "@/features/verida/utils"

import DataTable from "../common/table"
import { useToast } from "../ui/use-toast"
import { columns } from "./account/column"

const logger = Logger.create("<IdentitiesTable>")

const fallbackData: Identity[] = []

export function IdentitiesTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { toast } = useToast()

  const { activeDIDCount } = useActiveDIDCount(
    clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
  )

  const { data, isLoading } = useQuery(
    ["identities", page, limit],
    async () => {
      const didRegistryBlockchain = getDidRegistryBlockchainForNetwork(
        clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
      )

      let dids = await getDIDs(
        didRegistryBlockchain,
        (page - 1) * limit,
        limit,
        true
      )

      // revert orders for `createdAt` desc
      dids.reverse()

      const profiles = await Promise.all(
        dids.map(async (did: string) => {
          try {
            const didDocument = (await getDidDocument(did)) as any
            const profile = await getAnyPublicProfile(veridaClient, did)

            return {
              ...profile,
              did: did,
              createdAt: didDocument?.created,
            }
          } catch (error) {
            logger.error(
              new Error(`Failed to get profile for DID: ${did}`, {
                cause: error,
              })
            )
            return null // or handle the error as needed
          }
        })
      )

      return profiles.filter((profile) => !!profile)
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch identities",
        })
        logger.error(error)
      },
      onSuccess: (data) => {
        if (data.length === 0) {
          toast({
            variant: "destructive",
            description: "Failed to fetch identities",
          })
        }
      },
    }
  )

  const validData = useMemo(() => data ?? fallbackData, [data])

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={columns}
        data={validData}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        title="identities"
        totalCount={activeDIDCount ?? 0}
        isLoading={isLoading}
        showSearch={false}
      />
    </div>
  )
}
