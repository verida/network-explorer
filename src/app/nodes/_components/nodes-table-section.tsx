import React from "react"

import { NodesTable } from "@/app/nodes/_components/nodes-table"

export type NodesTableSectionProps = React.ComponentProps<"section">

export function NodesTableSection(props: NodesTableSectionProps) {
  const { ...sectionProps } = props

  return (
    <section {...sectionProps}>
      <NodesTable />
    </section>
  )
}
