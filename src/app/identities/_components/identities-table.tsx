"use client"

import React, { useEffect, useMemo, useState } from "react"

import { identitiesTableColumns } from "@/app/identities/_components/identities-table-columns"
import DataTable from "@/components/common/table"
import { useToast } from "@/components/ui/use-toast"
import { useActiveIdentitiesCount } from "@/features/identities/hooks/useActiveIdentitiesCount"
import { useIdentities } from "@/features/identities/hooks/useIdentities"
import { Identity } from "@/features/identities/types"
import { didRegistryBlockchain } from "@/features/identities/utils.common"

const fallbackData: Identity[] = []

export function IdentitiesTable() {
  const { toast } = useToast()

  const { activeIdentitiesCount } = useActiveIdentitiesCount(
    didRegistryBlockchain
  )

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const {
    identities,
    isLoading: isLoadingIdentities,
    isError: isIdentitiesError,
  } = useIdentities({
    didRegistryBlockchain,
    limit,
    page,
  })

  const identityTableData = useMemo(
    () => identities ?? fallbackData,
    [identities]
  )

  // TODO: Replace the toast by proper UI feedback
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
        columns={identitiesTableColumns}
        data={identityTableData}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        title="identities"
        totalCount={activeIdentitiesCount ?? 0}
        isLoading={isLoadingIdentities}
        hideSearch
        hideFilters
      />
    </div>
  )
}
