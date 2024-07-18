import React from "react";
import CopyIcon from "@/assets/icons/copy.svg";
import VeridaIcon from "@/assets/svg/verida.svg";
import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";

const UnAuthorizedContent = () => {
  return (
    <>
      <div className="mt-6 flex flex-col gap-4 rounded-lg bg-[#FD4F64] p-6">
        <div className="text-[16px] font-semibold leading-[24px]">
          Your DID is not authorized to submit storage nodes, please contact
          Verida to gain early access.
        </div>
        <Button className="w-full text-[14px] font-semibold leading-[20px] text-[#19193D]">
          Contact Us
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-4 rounded-lg border border-white/60 p-6">
        <VeridaIcon />
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-normal leading-[20px] text-white/60">
            Verida Wallet
          </div>
          <div className="flex h-5 w-[140px] gap-2">
            <div className="text-[18px] font-semibold leading-[20px]">
              Oxeb...E363
            </div>
            <CopyIcon color="#FFFFFF99" className="scale-90" />
          </div>
        </div>
      </div>
      <Button className="mt- h-[48px] gap-2 rounded-lg bg-white/15 py-2.5 text-white hover:bg-white/15">
        <div>Disconnect</div>
        <LuLogOut />
      </Button>
    </>
  );
};

export default UnAuthorizedContent;
