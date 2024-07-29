import React from "react";
import SuccessIcon from "@/assets/svg/success.svg";
import { Tab } from "@/components/common/table";
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
        <div className="text-center text-[24px] font-bold leading-[28.8px] text-foreground">
          Success! Storage Node Registered
        </div>
        <div className="text-center text-[14px] font-normal text-muted-foreground">
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
        className="text-[14px] font-bold leading-[20px]"
      >
        View Details
      </Button>
    </div>
  );
};

export default HubSuccess;
