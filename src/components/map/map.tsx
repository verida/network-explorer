"use client"

import React from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

import LocationIcon from "@/assets/icons/location.svg"
import { cn } from "@/styles/utils"

// TODO: Check if working as server component

export type MapCoordinates = {
  latitude: number
  longitude: number
}

export type MapMarker = {
  coordinates: MapCoordinates
  type: "pin" | "value"
  value?: string
}

export type MapProps = {
  center?: MapCoordinates
  height?: number
  zoom?: number
  minZoom?: number
  maxZoom?: number
  markers?: MapMarker[]
} & React.ComponentProps<"div">

export function Map(props: MapProps) {
  const {
    center = {
      latitude: 10,
      longitude: 20,
    },
    markers,
    height,
    zoom = 1,
    minZoom,
    maxZoom,
    className,
    ...divProps
  } = props

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-map-background",
        className
      )}
      {...divProps}
    >
      <ComposableMap height={height} className="h-full w-full">
        <ZoomableGroup
          center={[center.longitude, center.latitude]}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
        >
          <Geographies geography="https://code.highcharts.com/mapdata/custom/world-highres2.topo.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="fill-map-foreground"
                />
              ))
            }
          </Geographies>
          {markers?.map((marker, index) => (
            <Marker
              key={index}
              coordinates={[
                marker.coordinates.longitude,
                marker.coordinates.latitude,
              ]}
            >
              {marker.type === "pin" ? (
                <LocationIcon className="scale-150 fill-accent" />
              ) : (
                <>
                  <circle
                    r={16}
                    className="fill-accent shadow-accent/50 drop-shadow-2xl"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-accent-foreground text-xs"
                  >
                    {marker.value}
                  </text>
                </>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
