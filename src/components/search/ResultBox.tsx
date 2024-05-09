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
              src="https://s3-alpha-sig.figma.com/img/70e7/0552/4ef89f068a49bffdf4e767fb9fcc2238?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fSApxso1-cbhrzB~FX0XH~4URc8BOK~AHJqmxhAoXOKxrZGVf8B4FyINs2hFPh2Pfqqeot42JXhTvVoVtXyHKQKIDnK~Rfol51p2IdPkcwBcfjIk1rNr9NHgFWh1Zm~Op4DIRdbre5G6qwIvDd-MIs1I73Q-S-XTWm4tW78Vy-506yfXRjmzxj4wRuj4K0VsU2M5Z8kFoCmbepGcZpE8p9-r7S5x~Cnq2HHGQ7Chh7KT-fOwt2CKgfqJ71rMvGgkAAukLfQQeEuZvpk8tMTkl6y~Yl2JQva6oC5QQ1Q4X7BaVZ3Rw1Ne-JTQ9ieSXiFXgBZNIDEdJGWnWwTGJnYBtA__"
              className="rounded-sm w-[88px] h-[88px]"
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
