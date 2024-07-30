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
      <div className="text-[14px] font-normal leading-[20px] text-muted-foreground">
        You need to stake the appropriate amount of tokens to ensure that your
        storage node joins the network.
      </div>
      <div className="result-box flex flex-col items-center gap-4 rounded-lg border border-border px-6 pb-8 pt-6">
        <div className="text-[16px] font-bold leading-[20px] text-muted-foreground">
          AMOUNT
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="tex-white text-[40px] font-bold leading-[60px]">
            100 VDA
          </div>
          <div className="text-[16px] font-bold leading-[20px]">$300.36</div>
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
        className="h-[48px] w-full rounded-lg bg-white px-6 py-[14px] text-[14px] font-semibold leading-[20px] text-[#111]"
      >
        {user.connected ? "Submit Transaction" : " Connect Crypto Wallet"}
      </Button>
      <div className="flex flex-col gap-4 text-[11px] font-semibold leading-[16px] text-foreground">
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
