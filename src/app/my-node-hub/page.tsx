import { columns } from "@/components/nodes/nodelist/column";
import { DataTable } from "@/components/nodes/nodelist/data-table";
import { nodes } from "@/lib/sample";
import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

const MyNodeHub = () => {
  const data = [
    {
      label: "Total Rewards Earned",
      value: "12,182.37 VDA",
      secondaryValue: "$8,706.10",
    },
    {
      label: "Total Stake",
      value: "5,894.56 VDA",
      secondaryValue: "$4,220.81",
    },
    {
      label: "Annual Percentage Yield",
      value: "34.48%",
    },
  ];

  return (
    <div className="flex flex-col mt-10 gap-8">
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-5 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border border-white/20 p-6 rounded-lg w-full"
          >
            <div className="flex gap-2">
              <span className="text-white/60 font-normal text-[16px] leading-[20px]">
                {item.label}
              </span>
              <IoAlertCircleOutline color="#FFFFFF99" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-[32px] leading-[48px]">
                {item.value}
              </div>
              {item.secondaryValue && (
                <div className="font-semibold text-[16px] leading-[20px]">
                  {item.secondaryValue}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <DataTable data={nodes} columns={columns} showReigsterNodeButton />
    </div>
  );
};

export default MyNodeHub;
