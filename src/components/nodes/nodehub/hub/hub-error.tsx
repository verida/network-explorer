import React from "react";
import ErrorIcon from "@/assets/svg/error.svg";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/common/table";

const HubError = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <ErrorIcon />
      <div className="flex flex-col items-center gap-4">
        <div className="text-[24px] font-bold leading-[28.8.px]">
          Registration Failed
        </div>
        <div className="text-center text-[14px] font-normal leading-[20px] text-white/60">
          We're sorry, but the registration process for your storage node and
          VDA token stake has encountered an issue. Please review the details
          below and try again.
        </div>
        <Button
          onClick={() => {
            setTab("form");
          }}
          variant="ghost"
          className="text-[14px] font-bold leading-[20px]"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default HubError;
