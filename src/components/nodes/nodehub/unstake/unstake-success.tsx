import React from "react";
import SuccessIcon from "@/assets/svg/success.svg";

const UnStakeSuccess = () => {
  return (
    <div className="flex flex-col items-center gap-10 pt-10 pb-5">
      <SuccessIcon />
      <div className="flex flex-col gap-4">
        <div className="font-bold text-[24px] leading-[28.8px] text-center text-white">
          Process Completed: Storage Node Removed
        </div>
        <div className="text-white/60 text-center font-normal text-[14px]">
          The removal of the storage node is complete. Thank you for your
          cooperation. If you have any further questions, please reach out to
          our support team.
        </div>
      </div>
    </div>
  );
};

export default UnStakeSuccess;
