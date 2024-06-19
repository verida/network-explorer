import { Button } from "@/components/ui/button";
import { userAtom } from "@/lib/atom";
import React from "react";
import { useRecoilValue } from "recoil";
import { Tab } from "@/components/common/table";

const HubStake = ({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  const user = useRecoilValue(userAtom);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-white/60 font-normal text-[14px] leading-[20px]">
        You need to stake the appropriate amount of tokens to ensure that your
        storage node joins the network.
      </div>
      <div className="result-box border border-white/20 rounded-lg px-6 pt-6 pb-8 flex flex-col gap-4 items-center">
        <div className="font-bold text-[16px] leading-[20px] text-white/60">
          AMOUNT
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="font-bold tex-white leading-[60px] text-[40px]">
            100 VDA
          </div>
          <div className="leading-[20px] text-[16px] font-bold">$300.36</div>
        </div>
      </div>
      <Button
        onClick={() => {
          if (user.connected) {
            setTab("loading");
            setTimeout(() => {
              setTab("success");
              setTimeout(() => {
                setTab("error");
              }, 5000);
            }, 2000);
          } else {
            setTab("connected");
          }
        }}
        className="w-full bg-white rounded-lg py-[14px] px-6 h-[48px] font-semibold text-[14px] leading-[20px] text-[#111]"
      >
        {user.connected ? "Submit Transaction" : " Connect Crypto Wallet"}
      </Button>
      <div className="flex flex-col gap-4 font-semibold text-[11px] leading-[16px] text-white">
        <div className="flex justify-between">
          <div>Available Balance</div>
          <div>10695.861 VDA</div>
        </div>
        <div className="flex justify-between">
          <div>Value</div>
          <div>$ 3561.005</div>
        </div>
        <div className="flex justify-between">
          <div>Estimated Transaction fee</div>
          <div>$ 15.14</div>
        </div>
      </div>
    </div>
  );
};

export default HubStake;
