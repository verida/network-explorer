"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import CopyIcon from "@/assets/icons/copy.svg";
import { useToast } from "@/components/ui/use-toast";
import LocationIcon from "@/assets/icons/location.svg";

const DetailsPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const status = "Active";

  return (
    <div className="mt-5 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <FaChevronLeft
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer text-white/60 h-3"
        />
        <div className="font-bold text-[24px] leading-[28.8px]">
          Node Details
        </div>
      </div>
      <div className="flex justify-between lg:gap-4 gap-10 items-start lg:flex-row flex-col w-full">
        <div className="result-box rounded-lg gap-6 lg:px-6 p-5 lg:py-8 border border-white/20 flex flex-col lg:w-auto w-full">
          <div className="font-semibold text-[18px] leading-[20px] ">
            Node Info
          </div>
          <div className="flex gap-4 font-normal text-[14px] leading-[20px] flex-col items-start">
            <div className="flex justify-between items-center gap-2 sm:flex-row flex-col">
              <div>Node Name</div>
              <div>123435323</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Operator</div>
              <div className="flex items-center gap-2.5">
                <div className="text-[#8566F2] leading-[20px] text-[14px] font-normal sm:w-auto w-[calc(100%-13rem)] truncate">
                  did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55
                </div>
                <CopyIcon
                  color="#8566F2"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "did:VDA:mainnet:0x486e2c30cd7149bf1f77fe8d553c8078b9644a55"
                    );
                    toast({
                      description: "Copied DID",
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Public Key</div>
              <div className="flex items-center gap-2.5">
                <div className="text-[#8566F2] leading-[20px] text-[14px] font-normal truncate sm:w-auto w-[calc(100%-6.2rem)]">
                  0x486e2c30cd7149bf1f77fe8d553c8078b9644a55
                </div>
                <CopyIcon
                  color="#8566F2"
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "0x486e2c30cd7149bf1f77fe8d553c8078b9644a55"
                    );
                    toast({
                      description: "Copied DID",
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Datacenter</div>
              <div>AWS Asia Pacific (Sydney)</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Region</div>
              <div>Asia Pacific</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Country</div>
              <div>Australia</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Available Slots</div>
              <div>
                <span>60</span> <span className="text-white/60">/ 100</span>
              </div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Tokens Staked</div>
              <div>5,894.56 VDA</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Failure Reports</div>
              <div>2</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Days on Network</div>
              <div>30</div>
            </div>
            <div className="flex justify-between sm:items-center gap-2 sm:flex-row flex-col">
              <div>Status</div>
              <div>
                <div
                  className={`${
                    status === "Active"
                      ? "bg-[#16A34A33] border-[#16A34A33]"
                      : "bg-white/20 border-white/20"
                  } w-fit border  py-1.5 px-3 rounded-[53px]`}
                >
                  {status}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
            <LocationIcon className="absolute left-[43%] top-[30%] scale-150"/>
            <img src="/australia.png" className="md:w-[488px] w-full rounded-lg border border-white/20"/>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
