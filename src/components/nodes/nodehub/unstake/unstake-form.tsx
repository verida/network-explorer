import React from "react";
import { Tab } from "@/components/common/table";
import { Button } from "@/components/ui/button";

const UnStakeForm = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14px] font-normal leading-[20px] text-white/60">
        You have the following amount of VDA that can be unstaked.
      </div>
      <div className="result-box flex flex-col items-center gap-4 rounded-lg border border-white/20 px-6 pb-8 pt-6">
        <div className="text-[16px] font-bold leading-[20px] text-white/60">
          AMOUNT
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="tex-white text-[40px] font-bold leading-[60px]">
            100 VDA
          </div>
          <div className="text-[16px] font-bold leading-[20px]">$300.36</div>
        </div>
      </div>
      <Button
        onClick={() => {
          setTab("loading");
          setTimeout(() => {
            setTab("success");
          }, 2000);
        }}
        className="h-[48px] w-full rounded-lg bg-white px-6 py-[14px] text-[14px] font-semibold leading-[20px] text-[#111]"
      >
        Submit Transaction
      </Button>
      <div className="flex flex-col gap-4 text-[11px] font-semibold leading-[16px] text-white">
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
