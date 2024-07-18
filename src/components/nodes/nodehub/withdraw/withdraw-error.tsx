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
      <div className="flex flex-col items-center gap-4">
        <div className="text-[24px] font-bold leading-[28.8.px]">
          Node Removal Failed
        </div>
        <div className="text-center text-[14px] font-normal leading-[20px] text-white/60">
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
          className="text-[14px] font-bold leading-[20px]"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default WithdrawError;
