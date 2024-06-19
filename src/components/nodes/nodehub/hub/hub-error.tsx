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
      <div className="flex flex-col gap-4 items-center">
        <div className="font-bold text-[24px] leading-[28.8.px]">
          Registration Failed
        </div>
        <div className="text-center text-white/60 font-normal text-[14px] leading-[20px]">
          We're sorry, but the registration process for your storage node and
          VDA token stake has encountered an issue. Please review the details
          below and try again.
        </div>
        <Button
          onClick={() => {
            setTab("form");
          }}
          variant="ghost"
          className="font-bold text-[14px] leading-[20px]"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default HubError;
