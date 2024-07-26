// import { columns } from "@/components/nodes/nodelist/column";
// import { DataTable } from "@/components/nodes/nodelist/data-table";
// import { nodes } from "@/lib/sample";
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
    <div className="mt-10 flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-4 rounded-lg border p-6"
          >
            <div className="flex gap-2">
              <span className="text-[16px] font-normal leading-[20px] text-muted-foreground">
                {item.label}
              </span>
              <IoAlertCircleOutline color="#FFFFFF99" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[32px] font-bold leading-[48px]">
                {item.value}
              </div>
              {item.secondaryValue && (
                <div className="text-[16px] font-semibold leading-[20px]">
                  {item.secondaryValue}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <DataTable data={nodes} columns={columns} showReigsterNodeButton /> */}
    </div>
  );
};

export default MyNodeHub;
