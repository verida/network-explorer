"use client";

import React from "react";
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

const Distribution = () => {
  const { data, isLoading } = useQuery("distribution", async () => {
    const response = await fetch(
      "https://assets.verida.io/registry/storageNodes/mainnet.json",
      {
        method: "get",
      }
    );
    const data: any[] = await response.json();

    // remove repeating countries and add long,lat properties
    const countryCounts = data.reduce((acc, country) => {
      const countryLocation = country["countryLocation"];
      if (!acc[countryLocation]) {
        acc[countryLocation] = { ...country, count: 1 };
      } else {
        acc[countryLocation].count += 1;
      }
      return acc;
    }, {});

    const summary = Object.values(countryCounts).map((country: any) => {
      const countryData = COUNTRY_CODES.find(
        (c) => c.alpha2 === country["countryLocation"]
      );
      return {
        country: country["countryLocation"],
        latitude: countryData?.latitude,
        longitude: countryData?.longitude,
        count: country.count,
      };
    });
    return summary;
  });

  return (
    <div className="bg-[#191a1a] pt-3 pl-4 bg-opacity-70 mt-7 rounded-lg border border-white/20">
      <div className="font-semibold text-[24px] leading-[36px]">
        Node Distribution
      </div>
      <ComposableMap height={300} projectionConfig={{ rotate: [-20, 0, 0] }}>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={"/world.json"}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#353d45 " />
              ))
            }
          </Geographies>
          {data?.map(({ longitude, latitude, count }) => {
            return (
              <Marker coordinates={[Number(longitude), Number(latitude)]}>
                <Link href="/">
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
  );
};

export default Distribution;
