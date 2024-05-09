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
      className="bar-container p-6 rounded-[12px] flex flex-col my-14 gap-8"
    >
      <div className="flex justify-between">
        <div className="font-bold text-[24px] leading-[36px]">
          Total Accounts
        </div>
        <TabsList className="bg-white/10 h-auto rounded">
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold"
            value="dayly"
          >
            Dayly
          </TabsTrigger>
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold"
            value="weekly"
          >
            Weekly
          </TabsTrigger>
          <TabsTrigger
            className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold"
            value="monthly"
          >
            Monthly
          </TabsTrigger>
        </TabsList>
      </div>
      <Loader className="h-[350px]"/>
      <BarChart />
    </Tabs>
  );
};

export default TotalAccounts;
