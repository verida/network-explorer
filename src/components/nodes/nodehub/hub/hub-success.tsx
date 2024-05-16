import React from "react";
import SuccessIcon from "@/assets/svg/success.svg";
import { Tab } from "../../nodelist/data-table";
import { Button } from "@/components/ui/button";

const HubSuccess = ({
  setTab,
  setNodeDialogOpen,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
  setNodeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <SuccessIcon />
      <div className="flex flex-col gap-4">
        <div className="font-bold text-[24px] leading-[28.8px] text-center text-white">
          Success! Storage Node Registered
        </div>
        <div className="text-white/60 text-center font-normal text-[14px]">
          Congratulations! Your new storage node has been successfully
          registered, and the appropriate amount of VDA tokens has been staked.
          Your storage node is now part of the network.
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          setNodeDialogOpen(false);
          setTab("form");
        }}
        className="font-bold text-[14px] leading-[20px]"
      >
        View Details
      </Button>
    </div>
  );
};

export default HubSuccess;
