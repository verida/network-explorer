"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import LocationIcon from "@/assets/icons/location.svg";
import { useQuery } from "react-query";

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

const getMap = (continent: string) => {
  switch (continent.toLowerCase()) {
    case "Africa":
      return "https://code.highcharts.com/mapdata/custom/africa.topo.json";
    case "Asia":
      return "https://code.highcharts.com/mapdata/custom/asia.topo.json";
    case "Europe":
      return "https://code.highcharts.com/mapdata/custom/europe.topo.json";
    case "North America":
      return "https://code.highcharts.com/mapdata/custom/north-america.topo.json";
    case "Oceania":
      return "https://code.highcharts.com/mapdata/custom/oceania.topo.json";
    case "South America":
      return "https://code.highcharts.com/mapdata/custom/south-america.topo.json";
    case "Antarctica":
      return "https://code.highcharts.com/mapdata/custom/antarctica.topo.json";
    default:
      return "https://code.highcharts.com/mapdata/custom/world-highres3.topo.json";
  }
};

const getCoordinates = (country: string) => {
  const countryData = COUNTRY_CODES.find((c) => c.country === country);
  return {
    latitude: countryData?.latitude,
    longitude: countryData?.longitude,
    continent: getMap(countryData?.continent),
  };
};

const DetailsPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const nodeId = decodeURIComponent(params.node as unknown as string);

  const { data, error, isLoading } = useQuery(["nodeData"], fetchNodeData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

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

  const { latitude, longitude, map } = getCoordinates(country);

  return (
    <div className="mt-5 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer text-white/60 h-3"
        />
        <div className="font-bold text-[24px] leading-[28.8px]">
          Node Details
        </div>
      </div>
      <div className="flex justify-between lg:gap-4 gap-10 items-start lg:flex-row flex-col w-full">
        <div className="result-box rounded-lg gap-6 lg:px-6 p-5 lg:py-8 border border-white/20 flex flex-col lg:w-8/12 w-full">
          <div className="font-semibold text-[18px] leading-[20px] ">
            Node Info
          </div>
          <div className="flex gap-4 font-normal text-sm leading-5 flex-col items-start">
            <div className="flex justify-between w-full">
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
            <div className="flex justify-between w-full">
              <span>Datacenter</span>
              <span>{datacenter}</span>
            </div>
            <div className="flex justify-between w-full">
              <span>Region</span>
              <span>{region}</span>
            </div>
            <div className="flex justify-between w-full">
              <span>Country</span>
              <span>{country}</span>
            </div>
            <div className="flex justify-between w-full">
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
            <div className="flex justify-between w-full">
              <div>Status</div>
              <div>
                <div
                  className={`${
                    status === "Active"
                      ? "bg-[#16A34A33] border-[#16A34A33]"
                      : "bg-white/20 border-white/20"
                  } w-fit border  py-1.5 px-3 rounded-[53px]`}
                >
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <LocationIcon className="absolute left-[43%] top-[30%] scale-150" />
          {/* <img
            src="/australia.png"
            className="md:w-[488px] w-full rounded-lg border border-white/20"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
