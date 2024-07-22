"use client";

import React, { useEffect, useState } from "react";
import SearchAccount from "@/assets/svg/search-account.svg";
import Avatar from "@/assets/svg/avatar.svg";
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
      <div className="flex flex-col items-center justify-between gap-3 pt-4 md:flex-row md:gap-0 md:pt-8">
        <div className="relative flex w-full flex-col gap-10 md:max-w-[704px]">
          <div className="flex flex-col gap-3">
            <div className="text-[32px] font-bold leading-[60.48px] md:text-[48px]">
              Network Explorer
            </div>
            <div className="text-[14px] font-light leading-[27px] tracking-[-3%] md:text-[18px]">
              Use this to search through your account. Search what account you
              have access to, and find the DIDs that you need.
            </div>
          </div>
          <div className="relative">
            <div className="network-search z-50 flex flex-col items-center gap-6 rounded-lg border border-white/60 p-4 md:flex-row md:gap-2 md:py-2 md:pl-4 md:pr-2">
              <div className="flex w-full gap-2">
                <SearchIcon />
                <input
                  placeholder="Search by DID (did:vda:polpos:0x486e..644a55)"
                  onChange={(e) => {
                    setSearchDidInput(e.target.value);
                  }}
                  className="w-[80%] bg-transparent focus:border-none focus:outline-none"
                />
              </div>
              <button
                onClick={() => setPopoverOpen((prev) => !prev)}
                className="flex h-[48px] w-full items-center justify-center rounded-sm bg-white py-2.5 text-[14px] font-semibold leading-[17.64px] text-black md:w-[94px] md:rounded-lg md:py-3 md:pl-6 md:pr-5"
              >
                Search
              </button>
            </div>

            <div
              className={`mt-7 w-full rounded-lg border border-white/60 bg-[#333153] px-4 py-5 ${popoverOpen ? "-translate-y-0 opacity-100" : "-translate-y-7 opacity-0"} z-10 transition-all duration-150`}
            >
              {profile ? (
                <Link
                  href={`/search/${searchDidinput}`}
                  className="flex items-center gap-4"
                >
                  {profile.avatarUri ? (
                    <img
                      src={profile.avatarUri}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <Avatar />
                  )}
                  <div className="mt-2 flex flex-col gap-1.5 break-words text-white">
                    <div className="text-[14px] font-bold leading-[17.64px]">
                      {profile?.name}
                    </div>
                    <div className="leadig-[17.64px] w-[calc(100vw-125px)] break-words text-[14px] font-normal">
                      {searchDidinput}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex w-full items-center justify-center">
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
            </div>
          </div>
        </div>
        <div>
          <SearchAccount clas className="h-full w-full object-cover" />
        </div>
      </div>
      <Separator className="mt-10 hidden bg-white/20 md:block" />
    </>
  );
};

export default NetworkExplorer;
