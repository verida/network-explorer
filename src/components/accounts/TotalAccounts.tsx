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

const TotalAccounts = ({data}:{data:any}) => {
  const {AccountData,isLoading} = data;
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
      className="bar-container sm:p-6 pt-6 md:px-4 rounded-[12px] flex flex-col md:my-14 my-10 gap-8"
    >
      <div className="flex sm:flex-row flex-col md:px-0 px-4 justify-between">
        <div className="font-bold text-[24px] leading-[36px]">
          Total Accounts
        </div>
        <TabsList className="bg-white/10 h-auto rounded">
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold w-full"
            value="daily"
          >
            Daily
          </TabsTrigger>
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold w-full"
            value="weekly"
          >
            Weekly
          </TabsTrigger>
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold w-full"
            value="monthly"
          >
            Monthly
          </TabsTrigger>
        </TabsList>
      </div>
      <Loader isLoading={isLoading} className="sm:h-[350px] h-[150px]" />
      {data && <BarChart data={AccountData} tab={selectedTab} />}
    </Tabs>
  );
};

export default TotalAccounts;
