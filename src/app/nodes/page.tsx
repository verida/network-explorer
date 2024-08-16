import React from "react"

import { NodesMapSection } from "@/app/nodes/_components/nodes-map-section"
// import { NodesStatsSection } from "@/app/nodes/_components/NodesStatsSection"
import { NodesTableSection } from "@/app/nodes/_components/nodes-table-section"

export default function NodesPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold leading-tight">Overview</h1>
      <div className="flex flex-col gap-16">
        {/* <NodesStatsSection /> */}
        <NodesMapSection />
        <NodesTableSection />
      </div>
    </div>
  )
}
