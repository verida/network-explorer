"use client";

import React from "react";
import dynamic from "next/dynamic";
import Loader from "../common/loader";
import { useQuery } from "react-query";
import { csv2json } from "@/lib/utils/csvToArray";

const StorageChart = dynamic(() => import("../common/storage"), { ssr: false });

const DonutChart = dynamic(() => import("../common/donut"), { ssr: false });

const Overview = () => {
  const { data, isLoading } = useQuery(
    "storage_overview",
    async () => {
      const response = await fetch(
        "https://assets.verida.io/metrics/nodes/node2-southeastasia.mnaz.verida.tech/stats.csv"
      );
      const data = await response.text();

      let converted_data: {
        datetime_utc: string;
        max_storage_slots: string;
        storage_slots_used: string;
      }[] = csv2json(data);

      return converted_data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );


  return (
    <div className="flex flex-col gap-5">
      <div className="font-bold text-[32px] leading-[40.32.px] tracking-[-3%]">
        Overview
      </div>
      <div className="flex justify-between gap-4 md:flex-row flex-col">
        <div className="result-box flex flex-col gap-2.5 md:p-6  rounded-lg md:w-[65%]">
          <div className="flex justify-between md:flex-row flex-col md:p-0 px-6 pt-3 md:gap-0 gap-2">
            <div>Storage</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 h-3 w-3 rounded-[2px]"></div>
                <div className="leading-[20px] font-normal text-[14px]">
                  Capacity (GB)
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#8566F2] h-3 w-3 rounded-[2px]"></div>
                <div className="leading-[20px] font-normal text-[14px]">
                  Utilization (GB)
                </div>
              </div>
            </div>
          </div>
          <Loader isLoading={isLoading} className="h-[300px]" />
          {data && (
            <StorageChart
              data={data.map((item) => {
                return [
                  new Date(item.datetime_utc).getTime(),
                  Number(item.storage_slots_used),
                ];
              })}
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="rounded-lg result-box  border border-white/20 flex flex-col gap-4 p-4">
            <div className="text-white/60">Network Capacity</div>
            <div className="flex gap-3 items-center flex-wrap">
              <Loader isLoading={isLoading} className="h-[200px] w-[200px]" />
              {data && (
                <>
                  <DonutChart
                    percentage={(
                      (Number(data[data.length - 1].storage_slots_used) /
                        Number(data[data.length - 1].max_storage_slots)) *
                      100
                    ).toFixed(0)}
                  
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                      <div className="bg-white/20 w-3 h-3 rounded-[2px]"></div>
                      <div>Total {Math.ceil(Number(data[data.length - 1].max_storage_slots)/100)}G</div>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="bg-[#8566F2] w-3 h-3 rounded-[2px]"></div>
                      <div>Used {Math.ceil(Number(data[data.length - 1].storage_slots_used)/100)}G</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="result-box rounded-lg py-8 px-6 gap-4 border border-white/20">
            <div className="font-normal text-[16px] leading-[20px] text-white/60">
              Staked Tokens
            </div>
            <div className="font-semibold text-[32px] leading-[48px]">
              12.2M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
