import React from "react"

import { IdentitiesStatsSection } from "@/components/accounts/IdentitiesStatsSection"
import { IdentitiesTable } from "@/components/accounts/IdentitiesTable"
import NetworkExplorer from "@/components/accounts/NetworkExplorer"
import { Separator } from "@/components/ui/separator"
import { serverEnvVars } from "@/config/server"
import { getIdentitiesStatsData } from "@/features/identities/utils"

export default async function HomePage() {
  const identitiesStatsData = await getIdentitiesStatsData(
    serverEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
  )

  return (
    <div className="flex flex-col gap-16">
      <NetworkExplorer />
      <Separator className="hidden md:block" />
      <IdentitiesStatsSection data={identitiesStatsData} />
      <IdentitiesTable />
    </div>
  )
}
