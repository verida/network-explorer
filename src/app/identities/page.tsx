import React from "react"

import { IdentitiesSearchSection } from "@/app/identities/_components/identities-search-section"
import { IdentitiesStatsSection } from "@/app/identities/_components/identities-stats-section"
import { IdentitiesTableSection } from "@/app/identities/_components/identities-table-section"
import { Separator } from "@/components/ui/separator"
import { didRegistryBlockchain } from "@/features/identities/utils.common"
import { getIdentitiesStatsData } from "@/features/identities/utils.server"

export default async function IdentitiesPage() {
  const identitiesStatsData = await getIdentitiesStatsData(
    didRegistryBlockchain
  )

  return (
    <div className="flex flex-col gap-16">
      <IdentitiesSearchSection />
      <Separator className="hidden md:block" />
      <IdentitiesStatsSection data={identitiesStatsData} />
      <IdentitiesTableSection />
    </div>
  )
}
