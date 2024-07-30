import React from "react";
import SuccessIcon from "@/assets/svg/success.svg";
import { Tab } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const WithdrawSuccess = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <SuccessIcon />
      <div className="flex flex-col gap-4">
        <div className="text-center text-[24px] font-bold leading-[28.8px] text-foreground">
          Success! Removal Process Began
        </div>
        <div className="text-center text-[14px] font-normal text-muted-foreground">
          {`You have successfully initiated the removal process for the node. The
          status has been updated to 'Removing' and the node will remain in this
          state for the next 28 days.`}
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          router.push("/nodes");
        }}
        className="text-[14px] font-bold leading-[20px]"
      >
        View Details
      </Button>
    </div>
  );
};

export default WithdrawSuccess;
