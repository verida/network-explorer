"use client";

import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import Link from "next/link";
import Loader from "../common/loader";

export interface CountrySummary {
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  count: number;
}

export interface DistributionProps {
  summary: CountrySummary[];
  isLoading: boolean;
}

const Distribution = ({ summary: data }: DistributionProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <div className="relative h-[352px] rounded-lg border border-foreground/20 bg-[#191a1a] bg-opacity-70">
      <div className="absolute left-6 top-6 text-[24px] font-semibold leading-[36px]">
        Node Distribution
      </div>
      {isLoading ? (
        <div className="flex h-full flex-col items-center justify-center">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        data && (
          <div className="h-full w-full">
            <ComposableMap height={350} className="h-full w-full">
              <ZoomableGroup center={[20, 10]} zoom={1} minZoom={1} maxZoom={1}>
                <Geographies
                  geography={
                    "https://code.highcharts.com/mapdata/custom/world-highres2.topo.json"
                  }
                >
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#353d45 "
                      />
                    ))
                  }
                </Geographies>
                {data?.map(({ longitude, latitude, count, country }, index) => {
                  return (
                    <Marker
                      key={index}
                      coordinates={[Number(longitude), Number(latitude)]}
                    >
                      <Link href="#" title={country}>
                        <circle
                          fill="#8566F2"
                          r={9}
                          style={{ boxShadow: "0px 4px 24px 0px #8566F2CC" }}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize={10}
                        >
                          {count}
                        </text>
                      </Link>
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        )
      )}
    </div>
  );
};

export default Distribution;
