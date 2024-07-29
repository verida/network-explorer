"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import Loader from "../common/loader";
import { useQuery } from "react-query";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { csv2json } from "@/lib/utils/csvToArray";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });

const TotalAccounts = ({ data }: { data: any }) => {
  const { AccountData, isLoading } = data;
  const { toast } = useToast();

  const [selectedTab, setSelectedTab] = useState("monthly");

  // const { data, isLoading, isError, error } = useQuery(
  //   "totalAccounts",
  //   async () => {
  //     const response = await axios.get(
  //       "https://assets.verida.io/metrics/network/mainnet/stats.csv"
  //     );

  //     let data: {
  //       datetime_utc: string;
  //       activedids: string;
  //     }[] = csv2json(response.data);
  //     return data.map((item) => [
  //       new Date(item.datetime_utc).getTime(),
  //       Number(item.activedids),
  //     ]);
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     onError: (error) => {
  //       console.log(error);
  //       toast({
  //         variant: "destructive",
  //         description: "Failed to fetch data",
  //       });
  //     },
  //   }
  // );

  return (
    <Tabs
      defaultValue="monthly"
      onValueChange={(value) => {
        setSelectedTab(value);
      }}
      className="bar-container flex flex-col gap-8 rounded-xl border border-border pt-6 sm:p-6 md:px-4"
    >
      <div className="flex flex-col justify-between px-4 sm:flex-row md:px-0">
        <div className="text-[24px] font-bold leading-[36px]">
          Total Identities
        </div>
        <TabsList className="h-auto rounded bg-white/10">
          <TabsTrigger
            className="w-full px-1 py-0.5 text-[12px] font-semibold leading-[20px]"
            value="daily"
          >
            Daily
          </TabsTrigger>
          <TabsTrigger
            className="w-full px-1 py-0.5 text-[12px] font-semibold leading-[20px]"
            value="weekly"
          >
            Weekly
          </TabsTrigger>
          <TabsTrigger
            className="w-full px-1 py-0.5 text-[12px] font-semibold leading-[20px]"
            value="monthly"
          >
            Monthly
          </TabsTrigger>
        </TabsList>
      </div>
      <Loader isLoading={isLoading} className="h-[150px] sm:h-[350px]" />
      {data && <BarChart data={AccountData} tab={selectedTab} />}
    </Tabs>
  );
};

export default TotalAccounts;
