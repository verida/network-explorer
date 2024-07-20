"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
// import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
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
    status,
  } = nodeData;

  const { latitude, longitude, map } = getCountryData(country);

  return (
    <div className="mt-5 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="h-3 cursor-pointer text-white/60"
        />
        <div className="text-[24px] font-bold leading-[28.8px]">
          Node Details
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:gap-4">
        <div className="result-box flex w-full flex-col gap-6 rounded-lg border border-white/20 p-5 lg:w-8/12 lg:px-6 lg:py-8">
          <div className="text-[18px] font-semibold leading-[20px]">
            Node Info
          </div>
          <div className="flex flex-col items-start gap-4 text-sm font-normal leading-5">
            <div className="flex w-full justify-between">
              <span>Node Name</span>
              <span>{name}</span>
            </div>

            {/* <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Operator</div>
              <div className="flex items-center gap-2.5">
                <div className="text-[#8566F2] leading-[20px] text-[14px] font-normal sm:w-auto w-[calc(100%-13rem)] truncate">
                  {operator}
                </div>
                <CopyIcon
                  color="#8566F2"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(operator);
                    toast({
                      description: "Copied DID",
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Public Key</div>
              <div className="flex items-center gap-2.5">
                <div className="text-[#8566F2] leading-[20px] text-[14px] font-normal truncate sm:w-auto w-[calc(100%-6.2rem)]">
                  {publicKey}
                </div>
                <CopyIcon
                  color="#8566F2"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(publicKey);
                    toast({
                      description: "Copied Public Key",
                    });
                  }}
                />
              </div>
            </div> */}
            <div className="flex w-full justify-between">
              <span>Datacenter</span>
              <span>{datacenter}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Region</span>
              <span>{region}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Country</span>
              <span>{country}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Available Slots</span>
              <div>
                <span>{storageSlotsUsed}</span>{" "}
                <span className="text-white/60">/ {maxStorageSlots}</span>
              </div>
            </div>
            {/* <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Tokens Staked</div>
              <div>{tokensStaked} VDA</div>
            </div> */}
            {/* <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Failure Reports</div>
              <div>{failureReports}</div>
            </div> */}
            {/* <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Days on Network</div>
              <div>{daysOnNetwork}</div>
            </div> */}
            <div className="flex w-full justify-between">
              <div>Status</div>
              <div>
                <div
                  className={`${
                    status === "Active"
                      ? "border-[#16A34A33] bg-[#16A34A33]"
                      : "border-white/20 bg-white/20"
                  } w-fit rounded-[53px] border px-3 py-1.5`}
                >
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 rounded-[12px] border border-white/20 bg-[#191a1a] bg-opacity-70">
          <ComposableMap
            height={300}
            projectionConfig={{ rotate: [-20, 0, 0] }}
          >
            <ZoomableGroup center={[0, 0]} zoom={2}>
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
