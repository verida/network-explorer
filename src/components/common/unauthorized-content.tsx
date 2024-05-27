import React from "react";
import CopyIcon from "@/assets/icons/copy.svg";
import VeridaIcon from "@/assets/svg/verida.svg";
import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";

const UnAuthorizedContent = () => {
  return (
    <>
      <div className="bg-[#FD4F64] rounded-lg p-6 gap-4 flex flex-col mt-6">
        <div className="font-semibold text-[16px] leading-[24px]">
          Your DID is not authorized to submit storage nodes, please contact
          Verida to gain early access.
        </div>
        <Button className="w-full text-[#19193D] font-semibold text-[14px] leading-[20px]">
          Contact Us
        </Button>
      </div>

      <div className="rounded-lg p-6 border border-white/60 flex items-center gap-4 mt-3">
        <div className="bg-[#37D5C7] rounded-[300px] p-1">
          <VeridaIcon />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white/60 leading-[20px] text-[16px] font-normal">
            Verida Wallet
          </div>
          <div className="flex gap-2 h-5 w-[140px]">
            <div className="font-semibold text-[18px] leading-[20px]">
              Oxeb...E363
            </div>
            <CopyIcon color="#FFFFFF99" className="scale-90" />
          </div>
        </div>
      </div>
      <Button className="bg-white/15 py-2.5 gap-2 rounded-lg h-[48px] text-white hover:bg-white/15 mt-">
        <div>Disconnect</div>
        <LuLogOut />
      </Button>
    </>
  );
};

export default UnAuthorizedContent;
