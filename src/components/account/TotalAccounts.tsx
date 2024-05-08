"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Chart from "react-apexcharts";

const TotalAccounts = () => {
  const labels = ["Dec 2023", "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"];

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
      <Chart
        options={{
          chart: {
            id: "Total Accounts",
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: labels,
            labels: {
              style: {
                colors: "#666A7F",
                fontWeight: 400,
                fontSize: "10px",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#666A7F",
                fontWeight: 400,
                fontSize: "10px",
              },
            },
          },
          colors: ["#8566F2"],
          grid: {
            borderColor: "rgba(235, 235, 235, 0.1)",
            strokeDashArray: 0,
          },
          tooltip: {
            theme: "dark",
          },
        }}
        series={[
          {
            name: "Total Accounts",
            data: [1500, 17000, 22000, 23000, 24000],
          },
        ]}
        type="bar"
        height={350}
      />
    </Tabs>
  );
};

export default TotalAccounts;
