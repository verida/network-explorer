import React from "react";
import ErrorIcon from "@/assets/svg/error.svg";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/common/table";

const WithdrawError = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <ErrorIcon />
      <div className="flex flex-col gap-4 items-center">
        <div className="font-bold text-[24px] leading-[28.8.px]">
          Node Removal Failed
        </div>
        <div className="text-center text-white/60 font-normal text-[14px] leading-[20px]">
          Oops! Something went wrong during the node removal process. Please
          check your connection, ensure your crypto wallet is properly
          connected, and try again. If the issue persists, contact our support
          team for assistance.
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

export default WithdrawError;
