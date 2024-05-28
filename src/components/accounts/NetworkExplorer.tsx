"use client";

import React, { useState } from "react";
import SearchAccount from "@/assets/svg/search-account.svg";
import { Button } from "../ui/button";
import SearchIcon from "@/assets/icons/search.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const NetworkExplorer = () => {
  const [searchDID, setSearchDID] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

          <div className="network-search border border-white/60 md:py-2 p-4 md:pl-4 md:pr-2 rounded-lg flex md:flex-row flex-col items-center md:gap-2 gap-6">
           <div className="flex gap-2 w-full">

            <SearchIcon />
            <input
              placeholder="Search by DID (did:VDA:polpos:0x486e..644a55)"
              onChange={(e) => {
                setSearchDID(e.target.value);
              }}
              className="bg-transparent focus:border-none focus:outline-none w-[80%]"
              />
              </div>

            <Button
              onClick={() => {
                setShowPopup(!showPopup);
              }}
              className="md:rounded-lg rounded-sm h-[48px] md:w-[94px] w-full font-semibold text-[14px] leading-[17.64px] md:py-3 py-2.5 md:pl-6 md:pr-5"
            >
              Search
            </Button>
          </div>
          {showPopup && (
            <Link
              className="flex gap-4 w-full bg-[#333153] border border-white/60 py-6 px-4 rounded-lg absolute bottom-[-120px]"
              href="/search/did:VDA:mainnet:0xCDEdd96AfA6956f0299580225C2d9a52aca8487A"
            >
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex flex-col gap-1.5 break-words lg:w-full w-[calc(100%-50px)]">
                <div className="font-bold text-[14px] leading-[17.64px]">
                  Chris Were
                </div>
                <div className="font-normal text-[14px] leadig-[17.64px]">
                  did:VDA:mainnet:OxCDEdd96AfA6956f0299580225C2d9a52aca8487A
                </div>
              </div>
            </Link>
          )}
        </div>
        <SearchAccount />
      </div>
      <Separator className="mt-10 md:block hidden bg-white/20" />
    </>
  );
};

export default NetworkExplorer;
