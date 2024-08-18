import React from "react"

import Overview from "@/components/nodes/Overview"
import { csv2json } from "@/features/metrics/utils"

export interface CountrySummary {
  country: string
  latitude: number | undefined
  longitude: number | undefined
  count: number
}

const getStorageOverView = async () => {
  let isLoading = true
  const response = await fetch(
    "https://assets.verida.io/metrics/nodes/node2-southeastasia.mnaz.verida.tech/stats.csv"
  )
  if (!response.ok) {
    isLoading = false
    throw new Error("Failed to fetch data")
  }

  const data = await response.text()

  let converted_data: {
    datetime_utc: string
    max_storage_slots: string
    storage_slots_used: string
  }[] = csv2json(data)

  isLoading = false
  return {
    converted_data,
    isLoading,
  }
}

export type NodesStatsSectionProps = React.ComponentProps<"section">

export async function NodesStatsSection(props: NodesStatsSectionProps) {
  const { ...sectionProps } = props

  const data = await getStorageOverView()

  return (
    <section {...sectionProps}>
      <Overview StorageOverView={data} />
    </section>
  )
}
