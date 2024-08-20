"use client"

import { useMemo } from "react"

import { CopyToClipboardContent } from "@/components/common/copy-to-clipboard-content"
import { Map, MapMarker } from "@/components/map/map"
import { StorageNodeStatusBadge } from "@/components/nodes/storage-node-status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
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
      <Card className="flex-1">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Name</p>
              <p className="truncate">{node.name ?? EMPTY_VALUE_FALLBACK}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Description</p>
              <p className="line-clamp-6 break-words">
                {node.description ?? EMPTY_VALUE_FALLBACK}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Service endpoint</p>
              {node.serviceEndpoint ? (
                <CopyToClipboardContent
                  content={node.serviceEndpoint}
                  successMessage="Service endpoint copied!"
                  className="-my-2.5 text-inherit"
                >
                  <p className="truncate">
                    {node.serviceEndpoint ?? EMPTY_VALUE_FALLBACK}
                  </p>
                </CopyToClipboardContent>
              ) : (
                <p>{`-`}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Data center</p>
              <p className="truncate">
                {node.datacenter ?? EMPTY_VALUE_FALLBACK}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Country</p>
              <p className="truncate">{node.country ?? EMPTY_VALUE_FALLBACK}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Region</p>
              <p className="truncate">{node.region ?? EMPTY_VALUE_FALLBACK}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground">Used / Total slots</p>
              <p>
                <span>{node.storageSlotsUsed ?? EMPTY_VALUE_FALLBACK}</span>{" "}
                <span className="text-muted-foreground">
                  / {node.maxStorageSlots ?? EMPTY_VALUE_FALLBACK}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <StorageNodeStatusBadge status={node.status} />
            </div>
          </div>
        </CardContent>
      </Card>
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
