"use client"

import { useMemo } from "react"

import { Map, MapMarker } from "@/components/map/map"
import { StorageNodeStatusBadge } from "@/components/nodes/storage-node-status-badge"
import { StorageNode } from "@/features/storagenodes/types"

export type NodePageContentProps = {
  node: StorageNode
}

export function NodePageContent(props: NodePageContentProps) {
  const { node } = props

  const mapCenter = useMemo(() => {
    if (node.countryCoordinates) {
      return {
        latitude: Number(node.countryCoordinates.latitude),
        longitude: Number(node.countryCoordinates.longitude),
      }
    }
    return undefined
  }, [node])

  const mapMarkers: MapMarker[] = useMemo(() => {
    if (node.countryCoordinates) {
      const marker: MapMarker = {
        type: "pin",
        coordinates: {
          latitude: Number(node.countryCoordinates.latitude),
          longitude: Number(node.countryCoordinates.longitude),
        },
      }
      return [marker]
    }
    return []
  }, [node])

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="result-box flex flex-1 flex-col gap-6 rounded-lg border border-border px-6 py-8">
        <div className="text-[18px] font-semibold leading-[20px]">Details</div>
        <div className="flex flex-col items-start gap-4 text-sm font-normal leading-5">
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-muted-foreground">Node Name</span>
            <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
              {node.name}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-muted-foreground">Datacenter</span>
            <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
              {node.datacenter}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-muted-foreground">Region</span>
            <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
              {node.region}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-muted-foreground">Country</span>
            <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
              {node.country}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-muted-foreground">Used/Total slots</span>
            <div>
              <span>{node.storageSlotsUsed}</span>{" "}
              <span className="text-muted-foreground">
                / {node.maxStorageSlots}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-muted-foreground">Status</span>
            <StorageNodeStatusBadge status={node.status} />
          </div>
        </div>
      </div>
      <Map
        zoom={3}
        minZoom={3}
        maxZoom={3}
        center={mapCenter}
        markers={mapMarkers}
        className="lg:w-2/5"
      />
    </div>
  )
}
