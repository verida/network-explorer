import React from "react"

import { IdentitiesTable } from "@/app/identities/_components/identities-table"

export type IdentitiesTableSectionProps = React.ComponentProps<"section">

export function IdentitiesTableSection(props: IdentitiesTableSectionProps) {
  const { ...sectionProps } = props

  return (
    <section {...sectionProps}>
      <IdentitiesTable />
    </section>
  )
}
