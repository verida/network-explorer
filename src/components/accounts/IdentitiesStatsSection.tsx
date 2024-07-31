"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import Loader from "../common/loader";
import { useState } from "react";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });

export type IdentitiesStatsSectionProps = {
  data: any; // TODO: Define type
};

export function IdentitiesStatsSection(props: IdentitiesStatsSectionProps) {
  const { data } = props;
  const { AccountData, isLoading } = data;

  const [selectedTab, setSelectedTab] = useState("monthly");

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
}
