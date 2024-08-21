"use client"

import React, { useMemo } from "react"

import { Loading } from "@/components/common/loading"
import { Map as MapComp, MapMarker } from "@/components/map/map"
import { clientEnvVars } from "@/config/client"
import { useStorageNodes } from "@/features/storagenodes/hooks/useStorageNodes"

export type NodesMapProps = {
  title?: string
} & React.ComponentProps<"div">

export function NodesMap(props: NodesMapProps) {
  const { title, ...divProps } = props

  const { storageNodes, isLoading } = useStorageNodes({
    network: clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK,
  })

  const markers: MapMarker[] = useMemo(() => {
    if (!storageNodes) {
      return []
    }

    const markersMap = new Map<string, MapMarker>()

    //
    storageNodes
      .filter((node) => !!node.countryCoordinates)
      .forEach((node) => {
        const marker = markersMap.get(node.countryCode)
        if (marker) {
          marker.value = (parseInt(marker.value ?? "1") + 1).toString()
          markersMap.set(node.countryCode, marker)
        } else {
          markersMap.set(node.countryCode, {
            coordinates: {
              latitude: node.countryCoordinates?.latitude as number,
              longitude: node.countryCoordinates?.longitude as number,
            },
            type: "value",
            value: "1",
          })
        }
      })

    return Array.from(markersMap.values())
  }, [storageNodes])

  return (
    <div {...divProps}>
      <div className="relative">
        {title ? (
          <div className="absolute left-6 top-6 text-xl font-semibold leading-[36px]">
            {title}
          </div>
        ) : null}
        {isLoading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        ) : null}
        <MapComp
          className="h-[352px]"
          height={350}
          zoom={1}
          maxZoom={1}
          minZoom={1}
          markers={markers}
        />
      </div>
    </div>
  )
}
