"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

import LocationIcon from "@/assets/icons/location.svg";
import { useQuery } from "react-query";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Node } from "@/types/node";
import { COUNTRY_CODES } from "@/lib/constants";

const fetchNodeData = async () => {
  const response = await fetch(
    "https://assets.verida.io/metrics/nodes/mainnet-nodes-summary.json"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const getMap = (continent?: string) => {
  switch (continent) {
    case "Africa":
      return "https://code.highcharts.com/mapdata/custom/africa.topo.json";
    case "Asia":
      return "https://code.highcharts.com/mapdata/custom/asia.topo.json";
    case "Europe":
      return "https://code.highcharts.com/mapdata/custom/europe.topo.json";
    case "North America":
      return "https://code.highcharts.com/mapdata/custom/north-america-no-central.topo.json";
    case "Oceania":
      return "https://code.highcharts.com/mapdata/custom/oceania.topo.json";
    case "South America":
      return "https://code.highcharts.com/mapdata/custom/south-america.topo.json";
    case "Antarctica":
      return "https://code.highcharts.com/mapdata/custom/antarctica.topo.json";
    default:
      return "https://code.highcharts.com/mapdata/custom/world-highres2.topo.json";
  }
};

const getCountryData = (country: string) => {
  const countryData = COUNTRY_CODES.find((c) => c.country === country);
  return {
    latitude: countryData?.latitude,
    longitude: countryData?.longitude,
    map: getMap(countryData?.continent),
  };
};

const DetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const nodeId = decodeURIComponent(params.node as unknown as string);

  const { data, isError, isLoading } = useQuery(["nodeData"], fetchNodeData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const nodeData = data.find((node: Node) => node.id === nodeId);

  if (!nodeData) return <div>Node not found</div>;

  const {
    name,
    // operator,
    // publicKey,
    datacenter,
    region,
    country,
    storageSlotsUsed,
    maxStorageSlots,
    // tokensStaked,
    // failureReports,
    // daysOnNetwork,
    status = "Active",
  } = nodeData;

  const { latitude, longitude, map } = getCountryData(country);

  return (
    <div className="mt-5 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="h-6 w-6 cursor-pointer text-white/60"
        />
        <div className="text-[24px] font-bold leading-[28.8px]">
          Node Details
        </div>
      </div>
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-4">
        <div className="result-box flex h-full w-full flex-col gap-6 rounded-lg border border-white/20 p-5 lg:w-8/12 lg:px-6 lg:py-8">
          <div className="text-[18px] font-semibold leading-[20px]">
            Node Info
          </div>
          <div className="flex flex-col items-start gap-4 text-sm font-normal leading-5">
            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span>Node Name</span>
              <div className="flex items-center gap-2.5">
                <div className="truncate text-[14px] font-normal leading-[20px] text-[#8566F2] sm:w-auto">
                  {name}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span>Datacenter</span>
              <div className="flex items-center gap-2.5">
                <div className="truncate text-[14px] font-normal leading-[20px] text-[#8566F2] sm:w-auto">
                  {datacenter}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span>Region</span>
              <div className="flex items-center gap-2.5">
                <div className="truncate text-[14px] font-normal leading-[20px] text-[#8566F2] sm:w-auto">
                  {region}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span>Country</span>
              <div className="flex items-center gap-2.5">
                <div className="truncate text-[14px] font-normal leading-[20px] text-[#8566F2] sm:w-auto">
                  {country}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span>Available Slots</span>
              <div className="flex items-center gap-2.5">
                <div className="truncate text-[14px] font-normal leading-[20px] text-[#8566F2] sm:w-auto">
                  <span>{storageSlotsUsed}</span>{" "}
                  <span>/ {maxStorageSlots}</span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span>Status</span>
              <div className="flex items-center gap-2.5">
                <div
                  className={`${
                    status === "Active"
                      ? "border-[#16A34A33] bg-[#16A34A33] text-[#16A34A]"
                      : "border-white/20 bg-white/20"
                  } w-fit rounded-[53px] border px-3 py-1.5`}
                >
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-[12px] border border-white/20 bg-[#191a1a] bg-opacity-70 lg:w-3/5">
          <ComposableMap
            className="h-[324px] w-full"
            projectionConfig={{ rotate: [-20, 0, 0] }}
          >
            <ZoomableGroup
              center={[Number(longitude), Number(latitude)]}
              zoom={3}
            >
              <Geographies geography={map}>
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
              <Marker coordinates={[Number(longitude), Number(latitude)]}>
                <LocationIcon className="scale-150" />
              </Marker>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
