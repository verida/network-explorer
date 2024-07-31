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
import { getNodeMetricsFileUrl } from "@/features/storagenodes/utils";
import { clientEnvVars } from "@/config/client";

const fetchNodeData = async () => {
  const url = getNodeMetricsFileUrl(clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const getCountryData = (country: string) => {
  const countryData = COUNTRY_CODES.find((c) => c.country === country);
  return {
    latitude: countryData?.latitude,
    longitude: countryData?.longitude,
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

  const { latitude, longitude } = getCountryData(country);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="h-6 w-6 cursor-pointer text-muted-foreground"
        />
        <div className="text-[24px] font-bold leading-[28.8px]">
          Node Details
        </div>
      </div>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="result-box flex flex-1 flex-col gap-6 rounded-lg border border-border px-6 py-8">
          <div className="text-[18px] font-semibold leading-[20px]">
            Node Info
          </div>
          <div className="flex flex-col items-start gap-4 text-sm font-normal leading-5">
            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Node Name</span>
              <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
                {name}
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Datacenter</span>
              <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
                {datacenter}
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Region</span>
              <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
                {region}
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Country</span>
              <div className="truncate text-[14px] font-normal leading-[20px] sm:w-auto">
                {country}
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Used/Total slots</span>
              <div>
                <span>{storageSlotsUsed}</span>{" "}
                <span className="text-muted-foreground">
                  / {maxStorageSlots}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-muted-foreground">Status</span>
              <div
                className={`${
                  status === "Active"
                    ? "border-[#16A34A33] bg-[#16A34A33] text-[#16A34A]"
                    : "border-border bg-white/20"
                } w-fit rounded-[53px] border px-3 py-1.5`}
              >
                Active
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[12px] border border-border bg-[#191a1a] bg-opacity-70 lg:w-2/5">
          <ComposableMap className="h-[324px] w-full">
            <ZoomableGroup
              center={[Number(longitude), Number(latitude)]}
              zoom={3}
            >
              <Geographies geography="https://code.highcharts.com/mapdata/custom/world-highres2.topo.json">
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
