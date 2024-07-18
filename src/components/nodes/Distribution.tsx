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
import { useQuery } from "react-query";
import { COUNTRY_CODES } from "@/lib/constants/misc";
import Loader from "../common/loader";
import { useSearchParams } from "next/navigation";

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
    <div className="mt-7 rounded-lg border border-white/20 bg-[#191a1a] bg-opacity-70 pl-4 pt-3">
      <div className="text-[24px] font-semibold leading-[36px]">
        Node Distribution
      </div>
      {isLoading ? (
        <Loader isLoading={isLoading} className="h-[300px]" />
      ) : (
        data && (
          <ComposableMap
            height={300}
            projectionConfig={{ rotate: [-20, 0, 0] }}
          >
            <ZoomableGroup center={[0, 0]} zoom={1}>
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
        )
      )}
    </div>
  );
};

export default Distribution;
