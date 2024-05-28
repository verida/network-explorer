"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import Loader from "../common/loader";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });

const TotalAccounts = () => {
  
  return (
    <Tabs
      defaultValue="monthly"
      className="bar-container sm:p-6 pt-6 md:px-4 rounded-[12px] flex flex-col md:my-14 my-10 gap-8"
    >
      <div className="flex sm:flex-row flex-col md:px-0 px-4 justify-between">
        <div className="font-bold text-[24px] leading-[36px]">
          Total Accounts
        </div>
        <TabsList className="bg-white/10 h-auto rounded">
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold w-full"
            value="dayly"
          >
            Dayly
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
      <Loader className="sm:h-[350px] h-[150px]"/>
      <BarChart />
    </Tabs>
  );
};

export default TotalAccounts;
