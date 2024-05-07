"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartData,
} from "chart.js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const TotalAccounts = () => {
  const labels = ["Dec 2023", "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"];

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: "Accounts",
        data: [710, 17000, 21000, 22000, 23000, 24000],
        backgroundColor: "#8566F2",
      },
    ],
  };

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
          <TabsTrigger className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold" value="dayly">Dayly</TabsTrigger>
          <TabsTrigger className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold" value="weekly">Weekly</TabsTrigger>
          <TabsTrigger className="py-0.5 px-1 text-[12px] leading-[20px] font-semibold" value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </div>
      <Bar
        options={{
          responsive: true,

          scales: {
            x: {
              ticks: {
                color: "#666A7F",
                font: {
                  size: 10,
                  weight: 400,
                },
              },
            },
            y: {
              grid: {
                color: "rgb(235, 235, 235, 0.1)",
              },
              ticks: {
                font: {
                  size: 10,
                  weight: 400,
                },
                color: "#666A7F",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={data}
      />
    </Tabs>
  );
};

export default TotalAccounts;
