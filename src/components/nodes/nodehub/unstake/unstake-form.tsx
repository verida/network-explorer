import React from "react";
import { Tab } from "../../nodelist/data-table";
import { Button } from "@/components/ui/button";

const UnStakeForm = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-white/60 font-normal text-[14px] leading-[20px]">
        You have the following amount of VDA that can be unstaked.
      </div>
      <div className="result-box border border-white/20 rounded-lg px-6 pt-6 pb-8 flex flex-col gap-4 items-center">
        <div className="font-bold text-[16px] leading-[20px] text-white/60">
          AMOUNT
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="font-bold tex-white leading-[60px] text-[40px]">
            100 VDA
          </div>
          <div className="leading-[20px] text-[16px] font-bold">$300.36</div>
        </div>
      </div>
      <Button
        onClick={() => {
          setTab("loading");
          setTimeout(() => {
            setTab("success");
          }, 2000);
        }}
        className="w-full bg-white rounded-lg py-[14px] px-6 h-[48px] font-semibold text-[14px] leading-[20px] text-[#111]"
      >
        Submit Transaction
      </Button>
      <div className="flex flex-col gap-4 font-semibold text-[11px] leading-[16px] text-white">
        <div className="flex justify-between">
          <div>Available Balance</div>
          <div>10695.861 VDA</div>
        </div>
        <div className="flex justify-between">
          <div>Value</div>
          <div>$ 3561.005</div>
        </div>
        <div className="flex justify-between">
          <div>Estimated Transaction fee</div>
          <div>$ 15.14</div>
        </div>
      </div>
    </div>
  );
};

export default UnStakeForm;
