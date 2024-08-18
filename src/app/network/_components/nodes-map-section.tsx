import React from "react"

import { NodesMap } from "@/app/network/_components/nodes-map"

export type NodesMapSectionProps = React.ComponentProps<"section">

export async function NodesMapSection(props: NodesMapSectionProps) {
  const { ...sectionProps } = props

  return (
    <section {...sectionProps}>
      <NodesMap title="Nodes Distribution" />
    </section>
  )
}
