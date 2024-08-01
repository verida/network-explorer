import React from "react"

import { IdentitiesSearchSection } from "@/components/identities/IdentitiesSearchSection"
import { IdentitiesStatsSection } from "@/components/identities/IdentitiesStatsSection"
import { IdentitiesTable } from "@/components/identities/table/IdentitiesTable"
import { Separator } from "@/components/ui/separator"
import { serverEnvVars } from "@/config/server"
import { getIdentitiesStatsData } from "@/features/identities/utils"

export default async function HomePage() {
  const identitiesStatsData = await getIdentitiesStatsData(
    serverEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
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
