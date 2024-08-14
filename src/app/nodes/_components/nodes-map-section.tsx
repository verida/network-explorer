import React from "react"

import Distribution from "@/components/nodes/Distribution"
import { serverEnvVars } from "@/config/server"
import { COUNTRY_COORDINATES } from "@/features/countries/constants"
import { getNodeRegistryUrl } from "@/features/storagenodes/utils"

const getDistributions = async () => {
  let isLoading = true

  // We fetch the registry file only to get the node countryLocation. If we can
  // get that information from the nodes metrics file, it would be less complex
  // as we can factorise some of the code.
  // TODO: Factorise the use of the registry file and the metrics file
  const url = getNodeRegistryUrl(serverEnvVars.NEXT_PUBLIC_VERIDA_NETWORK)

  const response = await fetch(url, {
    method: "get",
  })
  if (!response.ok) {
    isLoading = false
    throw new Error("Failed to fetch data")
  }

  if (response.ok) {
    isLoading = false
  }
  const data: any[] = await response.json()

  // remove repeating countries and add long,lat properties
  const countryCounts = data.reduce((acc, country) => {
    const countryLocation = country["countryLocation"]
    if (!acc[countryLocation]) {
      acc[countryLocation] = { ...country, count: 1 }
    } else {
      acc[countryLocation].count += 1
    }
    return acc
  }, {})

  const summary = Object.values(countryCounts).map((country: any) => {
    const countryData = COUNTRY_COORDINATES.find(
      (c) => c.alpha2 === country["countryLocation"]
    )
    return {
      country: country["countryLocation"],
      latitude: countryData?.latitude,
      longitude: countryData?.longitude,
      count: country.count,
    }
  })
  isLoading = false
  return {
    summary,
    isLoading,
  }
}

export type NodesMapSectionProps = React.ComponentProps<"section">

export async function NodesMapSection(props: NodesMapSectionProps) {
  const { ...sectionProps } = props

  const distribution = await getDistributions()

  return (
    <section {...sectionProps}>
      <Distribution
        summary={distribution.summary}
        isLoading={distribution.isLoading}
      />
    </section>
  )
}
