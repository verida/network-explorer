import React from "react";
import { Oval } from "react-loader-spinner";

const HubLoading = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10 py-8 px-4">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#D9D9D9"
        secondaryColor="rgb(217, 217,217,0.3)"
        wrapperClass=""
      />
      <div className="flex flex-col gap-3 items-center">
        <div className="font-bold text-[18px] leading-[20px] text-white">
          Processing Transaction
        </div>
        <div className="font-normal text-[14px] leading-[20px] text-white/60 text-center">
          Your transaction is currently being processed. This may take a few
          moments as it is confirmed on the blockchain. Please be patient.
        </div>
      </div>
    </div>
  );
};

export default HubLoading;
