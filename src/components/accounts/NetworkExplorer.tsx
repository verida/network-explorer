"use client";

import React, { useEffect, useState } from "react";
import SearchAccount from "@/assets/svg/search-account.svg";
import { Button } from "../ui/button";
import SearchIcon from "@/assets/icons/search.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { useToast } from "../ui/use-toast";
import { Oval } from "react-loader-spinner";
import { WebUserProfile } from "@verida/web-helpers";
import { getAnyPublicProfile } from "@/lib/utils/veridaUtils";
import { config } from "@/lib/config";
import { useQuery } from "react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const NetworkExplorer = () => {
  const { toast } = useToast();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchDidinput, setSearchDidInput] = useState("");
  const { data: profile, isLoading } = useQuery<WebUserProfile>(
    ["accounts", searchDidinput],
    async () => {
      return await getAnyPublicProfile(config.client, searchDidinput);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: searchDidinput.length > 0,
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch profile",
        });
      },
    }
  );

  useEffect(() => {
    if (isLoading || profile) {
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
    }
  }, [isLoading]);

  return (
    <>
      <div className="flex md:flex-row flex-col md:gap-0 gap-3 justify-between md:pt-8 pt-4 items-center">
        <div className="flex flex-col gap-10 w-full md:max-w-[704px] relative">
          <div className="flex flex-col gap-3">
            <div className="font-bold md:text-[48px] text-[32px] leading-[60.48px]">
              Network Explorer
            </div>
            <div className="font-light text-[14px] md:text-[18px] leading-[27px] tracking-[-3%]">
              Use this to search through your account. Search what account you
              have access to, and find the DIDs that you need.
            </div>
          </div>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <div className="network-search border border-white/60 md:py-2 p-4 md:pl-4 md:pr-2 rounded-lg flex md:flex-row flex-col items-center md:gap-2 gap-6">
              <div className="flex gap-2 w-full">
                <SearchIcon />
                <input
                  placeholder="Search by DID (did:VDA:polpos:0x486e..644a55)"
                  onChange={(e) => {
                    setSearchDidInput(e.target.value);
                  }}
                  className="bg-transparent focus:border-none focus:outline-none w-[80%]"
                />
              </div>
              <PopoverTrigger className="md:rounded-lg bg-white text-black rounded-sm h-[48px] md:w-[94px] w-full font-semibold text-[14px] leading-[17.64px] md:py-3 py-2.5 md:pl-6 md:pr-5">
                Search
              </PopoverTrigger>
            </div>

            <PopoverContent
              align="end"
              alignOffset={-10}
              className="w-[calc(100vw-40px)] md:w-[704px] mt-7 bg-[#333153] border border-white/60 py-5 px-4 rounded-lg"
            >
              {profile ? (
                <Link href={`/search/${searchDidinput}`} className="flex gap-4 items-center ">
                  <img
                    src={
                      profile.avatarUri ??
                      "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                    }
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex flex-col gap-1.5 mt-2 break-words text-white">
                    <div className="font-bold text-[14px] leading-[17.64px]">
                      {profile.name}
                    </div>
                    <div className="font-normal text-[14px] leadig-[17.64px] break-words  w-[calc(100vw-125px)]">
                      {searchDidinput}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full flex justify-center items-center">
                  <Oval
                    visible={true}
                    height="50"
                    width="50"
                    color="#D9D9D9"
                    secondaryColor="rgb(217, 217,217,0.3)"
                    wrapperClass=""
                  />
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <SearchAccount />
      </div>
      <Separator className="mt-10 md:block hidden bg-white/20" />
    </>
  );
};

export default NetworkExplorer;
