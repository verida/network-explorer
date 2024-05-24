import React, { useState } from "react";
import QrCode from "@/assets/svg/qrcode.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { resultJson } from "@/lib/sample";

const ResultBox = ({ did }: { did: string }) => {
  const { toast } = useToast();
  const [showResultJson, setShowResultJson] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="font-normal text-[12px] leading-[18px] text-white/60">
        RESULTS:
      </div>
      <div className="flex flex-col gap-10 result-box p-10 rounded-lg border border-white/20 ">
        <div className="flex justify-between ">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-sm w-[88px] h-[88px] object-cover"
            />
            <div className="flex flex-col gap-3 w-[619px]">
              <div>Chris Were</div>
              <div className="w-full justify-between flex">
                <div className="text-white/60 font-normal text-[14px] leading-[20px]">
                  DID
                </div>
                <div className="text-[#8566F2] leading-[20px] font-normal text-[14px] gap-2 flex">
                  <span>{did}</span>
                  <CopyIcon
                    color="#8566F2"
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(did);
                      toast({
                        description: "Copied to clipboard",
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="font-normal text-[14px] leading-[20px] text-white/60">
                  Country
                </div>
                <div className="text-[14px] font-normal leading-[20px]">
                  Australia
                </div>
              </div>
              <div className="pt-6 flex flex-col gap-3">
                <div className="font-normal text-[14px] leading-[20px]">
                  Description
                </div>
                <div className="text-[14px] leading-[22.4px] font-normal">
                  Aliquam pulvinar vestibulum blandit. Donec sed nisl libero.
                  Fusce dignissim luctus sem eu dapibus. Pellentesque vulputate
                  quam a quam volutpat, sed ullamcorper erat commodo. Vestibulum
                  sit amet ipsum vitae mauris mattis vulputate lacinia nec
                  neque. Aenean quis consectetur nisi, ac interdum elit. Aliquam
                  sit amet luctus elit, id tempus purus.
                </div>
              </div>
              <Button
                className="mt-6 bg-transparent border-white/40 py-[15px] px-6 rounded-sm h-[48px] w-[197px]"
                variant="outline"
                onClick={() => {
                  setShowResultJson(!showResultJson);
                }}
              >
                {showResultJson ? "Hide" : "Show"} DID Document
              </Button>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 items-center h-fit"
            style={{ boxShadow: "0px 4.78px 28.7px 0px #1111111F" }}
          >
            <QrCode />
            {!showResultJson && <div>Scan to add contact</div>}
          </div>
        </div>
        {showResultJson && (
          <>
            <Separator color="#FFFFFF26" />
            <div className="leading-[22.4px] text-[14px] font-normal break-words">
              {resultJson}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultBox;
