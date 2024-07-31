"use client";

import React, { useEffect, useState } from "react";
import SearchAccountIllustration from "@/assets/svg/search-account.svg";
import Avatar from "@/assets/svg/avatar.svg";
import SearchIcon from "@/assets/icons/search.svg";
import Link from "next/link";

import { useToast } from "../ui/use-toast";
import { Oval } from "react-loader-spinner";
import { getAnyPublicProfile } from "@/lib/utils/veridaUtils";
import { useQuery } from "react-query";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { client as veridaClient } from "@/features/verida";

const NetworkExplorer = () => {
  const { toast } = useToast();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchDidinput, setSearchDidInput] = useState("");

  const { data: profile, isLoading } = useQuery(
    ["accounts", searchDidinput],
    async () => {
      return await getAnyPublicProfile(veridaClient, searchDidinput);
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
  }, [isLoading, profile]);

  return (
    <div className="flex flex-row justify-between gap-3">
      <div className="flex w-full flex-1 flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-[2rem] font-bold leading-[3rem] sm:text-5xl sm:leading-[3.75rem]">
            Network Explorer
          </h1>
          <p className="text-sm font-light leading-normal tracking-[-3%] sm:text-lg">
            Search for an identity by its identifier (DID) to view its profile
            and DID document
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {/* TODO: Rework the search and search result */}
          <div className="network-search flex flex-col items-center gap-6 rounded-lg border border-border-60 p-4 md:flex-row md:gap-2 md:py-2 md:pl-4 md:pr-2">
            <div className="flex w-full flex-row items-center gap-2">
              <SearchIcon />
              <input
                placeholder="Search by DID (did:vda:polpos:0x486e..644a55)"
                onChange={(e) => {
                  setSearchDidInput(e.target.value);
                }}
                className="flex-1 truncate bg-transparent focus:border-none focus:outline-none"
              />
            </div>
            <Button
              onClick={() => setPopoverOpen((prev) => !prev)}
              className="w-full md:w-fit"
            >
              Search
            </Button>
          </div>
          <div
            className={cn(
              "rounded-lg border border-border-60 bg-[#333153] px-4 py-5 transition-all duration-150",
              popoverOpen ? "opacity-100" : "opacity-0"
            )}
          >
            {profile ? (
              <Link
                href={`/search/${searchDidinput}`}
                className="flex flex-row items-center gap-4"
              >
                {profile.avatarUri ? (
                  <Image
                    src={profile.avatarUri}
                    className="aspect-square w-[50px] rounded object-cover"
                    // TODO: Fix the sizing when reworking the whole search component
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar
                    className="aspect-square w-[50px]" // TODO: Fix the sizing when reworking the whole search component
                    width="100%"
                    height="100%"
                  />
                )}
                <div className="flex flex-1 flex-col gap-1.5 truncate">
                  <div className="truncate text-[14px] font-bold leading-[17.64px]">
                    {profile?.name}
                  </div>
                  <div className="truncate text-[14px] font-normal leading-[17.64px]">
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
      <div className="hidden md:block">
        <SearchAccountIllustration width="100%" height="100%" />
      </div>
    </div>
  );
};

export default NetworkExplorer;
