"use client";

import React from "react";
import dynamic from "next/dynamic";
import Loader from "../common/loader";
import { useQuery } from "react-query";
import { csv2json } from "@/lib/utils/csvToArray";

const StorageChart = dynamic(() => import("../common/storage"), { ssr: false });

const DonutChart = dynamic(() => import("../common/donut"), { ssr: false });

type storageOverview = {
  data: {
    datetime_utc: string;
    max_storage_slots: string;
    storage_slots_used: string;
  }[];
  isLoading: boolean;
};
const Overview = ({ StorageOverView }: { StorageOverView: any }) => {
  const { converted_data: data, isLoading } = StorageOverView;

  const handleSlotsAndConvertToGb = (slots: string) => {
    return ((Number(slots) * 50) / 1024).toFixed(0);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-[32px] font-bold leading-[40.32.px] tracking-[-3%]">
        Overview
      </div>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="result-box flex flex-col gap-2.5 rounded-lg md:w-[65%] md:p-6">
          <div className="flex flex-col justify-between gap-2 px-6 pt-3 md:flex-row md:gap-0 md:p-0">
            <div>Storage</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-[2px] bg-white/20"></div>
                <div className="text-[14px] font-normal leading-[20px]">
                  Capacity (GB)
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-[2px] bg-[#8566F2]"></div>
                <div className="text-[14px] font-normal leading-[20px]">
                  Utilization (GB)
                </div>
              </div>
            </div>
          </div>
          <Loader isLoading={isLoading} className="h-[300px]" />
          {data && (
            <StorageChart
              utilization={data.map((item: any) => {
                return [
                  new Date(item.datetime_utc).getTime(),
                  Number(item.storage_slots_used),
                ];
              })}
              capacity={data.map((item: any) => {
                return [
                  new Date(item.datetime_utc).getTime(),
                  Number(item.max_storage_slots),
                ];
              })}
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-3">
          <div className="result-box flex min-w-[356px] flex-col gap-4 rounded-lg border border-border p-4">
            <div className="text-muted-foreground">Network Capacity</div>
            <div className="flex flex-wrap items-center gap-3">
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
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-[2px] bg-white/20"></div>
                      <div>
                        Total{" "}
                        {handleSlotsAndConvertToGb(
                          data[data.length - 1].max_storage_slots
                        )}
                        G
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-[2px] bg-[#8566F2]"></div>
                      <div>
                        Used{" "}
                        {handleSlotsAndConvertToGb(
                          data[data.length - 1].storage_slots_used
                        )}
                        G
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="result-box gap-4 rounded-lg border border-border px-6 py-8">
            <div className="text-[16px] font-normal leading-[20px] text-muted-foreground">
              Staked Tokens
            </div>
            <div className="text-[32px] font-semibold leading-[48px]">
              12.2M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
