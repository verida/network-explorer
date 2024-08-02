import React from "react"

import { IdentitiesSearchSection } from "@/components/identities/IdentitiesSearchSection"
import { IdentitiesStatsSection } from "@/components/identities/IdentitiesStatsSection"
import { IdentitiesTable } from "@/components/identities/table/IdentitiesTable"
import { Separator } from "@/components/ui/separator"
import {
  didRegistryBlockchain,
  getIdentitiesStatsData,
} from "@/features/identities/utils"

export default async function RootPage() {
  const identitiesStatsData = await getIdentitiesStatsData(
    didRegistryBlockchain
  )

  return (
    <div className="flex flex-col gap-16">
      <IdentitiesSearchSection />
      <Separator className="hidden md:block" />
      <IdentitiesStatsSection data={identitiesStatsData} />
      <IdentitiesTable />
    </div>
  )
}
