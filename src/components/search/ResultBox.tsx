import React, { useState } from "react";
import QrCode from "@/assets/svg/qrcode.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { resultJson } from "@/lib/sample";
import { useMediaQuery } from "react-responsive";
import { WebUserProfile } from "@verida/web-helpers";

interface Profile extends WebUserProfile {
  did: string;
}

const ResultBox = ({ profile }: { profile: Profile }) => {
  const { toast } = useToast();
  const [showResultJson, setShowResultJson] = useState(false);
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });

  return (
    <div className="flex flex-col gap-3">
      <div className="font-normal text-[12px] leading-[18px] text-white/60">
        RESULTS:
      </div>
      <div className="flex flex-col sm:gap-10 result-box lg:p-9 gap-6 py-6 px-4 rounded-lg border border-white/20 ">
        <div className="flex justify-between sm:flex-row flex-col sm:gap-3">
          <div className="flex gap-4 sm:flex-row flex-col">
            <img
              src={
                profile.avatarUri ??
                "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
              }
              className="rounded-sm w-[88px] h-[88px] object-cover sm:mx-0 mx-auto"
            />
            <div className="flex flex-col sm:gap-3 sm:w-auto w-full gap-4 lg:w-[619px]">
              <div className="sm:font-normal font-bold md:text-base text-[20px] sm:mx-0 mx-auto leading-[24px]">
                {profile.name}
              </div>
              <div
                className="flex sm:hidden flex-col gap-3 items-center h-fit"
                style={
                  isSmScreen
                    ? { boxShadow: "0px 4.78px 28.7px 0px #1111111F" }
                    : {}
                }
              >
                <QrCode />
                {!showResultJson && (
                  <div className="font-normal text-[11px] leading-[16px]">
                    Scan to add contact
                  </div>
                )}
              </div>
              <div className="justify-between flex sm:flex-row flex-col">
                <div className="text-white/60 font-normal text-[14px] leading-[20px]">
                  DID
                </div>
                <div className="text-[#8566F2] leading-[20px] font-normal text-[14px] gap-2 flex">
                  <span className="truncate lg:max-w-max md:max-w-[340px] max-w-[calc(100%-1.5  rem)]">
                    {profile.did}
                  </span>
                  <CopyIcon
                    color="#8566F2"
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(profile.did);
                      toast({
                        description: "Copied to clipboard",
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex sm:items-center sm:gap-8 sm:flex-row flex-col">
                <div className="font-normal text-[14px] leading-[20px] text-white/60">
                  Country
                </div>
                <div className="text-[14px] font-normal leading-[20px]">
                  {profile.country}
                </div>
              </div>
              <div className="sm:pt-6 pt-2 flex flex-col gap-3">
                <div className="font-normal text-[14px] leading-[20px] text-white/60">
                  Description
                </div>
                <div className="text-[14px] leading-[22.4px] font-normal break-words">
                  {profile.description}
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
            className="sm:flex hidden flex-col gap-3 items-center h-fit"
            style={{ boxShadow: "0px 4.78px 28.7px 0px #1111111F" }}
          >
            <QrCode />
            {!showResultJson && <div>Scan to add contact</div>}
          </div>
        </div>
        {showResultJson && (
          <>
            <Separator color="#FFFFFF26" className="sm:block hidden" />
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
