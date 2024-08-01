"use client"

import React, { useEffect, useMemo, useState } from "react"

import { clientEnvVars } from "@/config/client"
import { useActiveDIDCount } from "@/features/identities/hooks/useActiveDIDCount"
import { useIdentities } from "@/features/identities/hooks/useIdentities"
import { Identity } from "@/features/identities/types"

import DataTable from "../common/table"
import { useToast } from "../ui/use-toast"
import { identitiesTableColumnsDef } from "./account/identitiesTableColumnsDef"

const fallbackData: Identity[] = []

export function IdentitiesTable() {
  const { toast } = useToast()

  const { activeDIDCount } = useActiveDIDCount(
    clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
  )

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const {
    identities,
    isLoading: isLoadingIdentities,
    isError: isIdentitiesError,
  } = useIdentities({
    network: clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK,
    limit,
    page,
  })

  const identityTableData = useMemo(
    () => identities ?? fallbackData,
    [identities]
  )

  useEffect(() => {
    if (isIdentitiesError) {
      toast({
        variant: "destructive",
        description: "Failed to fetch identities",
      })
    }
  }, [isIdentitiesError, toast])

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={identitiesTableColumnsDef}
        data={identityTableData}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        title="identities"
        totalCount={activeDIDCount ?? 0}
        isLoading={isLoadingIdentities}
        showSearch={false}
      />
    </div>
  )
}
