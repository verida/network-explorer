import React from "react";
import CopyIcon from "@/assets/icons/copy.svg";
import VeridaIcon from "@/assets/svg/verida.svg";
import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";
import { useRecoilState } from "recoil";
import { userAtom } from "@/lib/atom";
import MetamaskIcon from "@/assets/svg/metamask.svg";

const AuthorizedContent = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <>
      <div className="font-bold text-[14px] leading-[20px] text-white/60">
        Connected Wallet
      </div>
      <div className="rounded-lg p-6 border border-white/15 flex items-center gap-4 mt-3">
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
      <div className="font-bold text-[14px] leading-[20px] text-white/60">
        Connect Crypto Wallet
      </div>
      <div
        className="rounded-lg p-6 border border-white/15 flex items-center gap-4 mt-3 cursor-pointer"
        onClick={() => {
          setUser({
            ...user,
            connected: true,
          });
        }}
      >
        <MetamaskIcon width={50} />
        <div className="text-white text-[18px] font-bold leading-[20px]">
          MetaMask
        </div>
      </div>
    </>
  );
};

export default AuthorizedContent;
