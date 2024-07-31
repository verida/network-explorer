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
      <div className="text-[14px] font-bold leading-[20px] text-muted-foreground">
        Connected Wallet
      </div>
      <div className="mt-3 flex items-center gap-4 rounded-lg border border-border-15 p-6">
        <VeridaIcon />
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-normal leading-[20px] text-muted-foreground">
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
      <Button className="mt- h-[48px] gap-2 rounded-lg bg-white/15 py-2.5 text-foreground hover:bg-white/15">
        <div>Disconnect</div>
        <LuLogOut />
      </Button>
      <div className="text-[14px] font-bold leading-[20px] text-muted-foreground">
        Connect Crypto Wallet
      </div>
      <div
        className="border-border15 border- mt-3 flex cursor-pointer items-center gap-4 rounded-lg p-6"
        onClick={() => {
          setUser({
            ...user,
            connected: true,
          });
        }}
      >
        <MetamaskIcon width={50} />
        <div className="text-[18px] font-bold leading-[20px] text-foreground">
          MetaMask
        </div>
      </div>
    </>
  );
};

export default AuthorizedContent;
