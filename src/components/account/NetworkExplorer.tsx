"use client";

import React, { useState } from "react";
import SearchAccount from "@/assets/svg/search-account.svg";
import { Button } from "../ui/button";
import SearchIcon from "@/assets/icons/search.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";

const NetworkExplorer = () => {
  const [searchDID, setSearchDID] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse md:gap-0 gap-3 justify-between pt-8 items-center">
        <div className="flex flex-col gap-10 w-full md:max-w-[704px] relative">
          <div className="flex flex-col gap-3">
            <div className="font-bold text-[48px] leading-[60.48px]">
              Network Explorer
            </div>
            <div className="font-light text-[18px] leading-[27px] tracking-[-3%]">
              Use this to search through your account. Search what account you
              have access to, and find the DIDs that you need.
            </div>
          </div>

          <div className="network-search border border-white/60 py-2 pl-4 pr-2 rounded-lg flex items-center gap-2">
            <SearchIcon />
            <input
              placeholder="Search by DID (did:VDA:polpos:0x486e..644a55)"
              onChange={(e) => {
                setSearchDID(e.target.value);
              }}
              className="bg-transparent focus:border-none focus:outline-none w-[80%]"
            />

            <Button
              onClick={() => {
                setShowPopup(!showPopup);
              }}
              className="rounded-lg h-[48px] w-[94px] font-semibold text-[14px] leading-[17.64px] py-3 pl-6 pr-5"
            >
              Search
            </Button>
          </div>
          {showPopup && (
            <Slide direction="up">
              <Link
                className="flex gap-4 w-full bg-[#333153] border border-white/60 py-6 px-4 rounded-lg"
                href="/search/did:VDA:mainnet:0xCDEdd96AfA6956f0299580225C2d9a52aca8487A"
              >
                <img
                  src="https://s3-alpha-sig.figma.com/img/70e7/0552/4ef89f068a49bffdf4e767fb9fcc2238?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fSApxso1-cbhrzB~FX0XH~4URc8BOK~AHJqmxhAoXOKxrZGVf8B4FyINs2hFPh2Pfqqeot42JXhTvVoVtXyHKQKIDnK~Rfol51p2IdPkcwBcfjIk1rNr9NHgFWh1Zm~Op4DIRdbre5G6qwIvDd-MIs1I73Q-S-XTWm4tW78Vy-506yfXRjmzxj4wRuj4K0VsU2M5Z8kFoCmbepGcZpE8p9-r7S5x~Cnq2HHGQ7Chh7KT-fOwt2CKgfqJ71rMvGgkAAukLfQQeEuZvpk8tMTkl6y~Yl2JQva6oC5QQ1Q4X7BaVZ3Rw1Ne-JTQ9ieSXiFXgBZNIDEdJGWnWwTGJnYBtA__"
                  className="w-10 h-10 rounded"
                />
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold text-[14px] leading-[17.64px]">
                    Chris Were
                  </div>
                  <div className="font-normal text-[14px] leadig-[17.64px]">
                    did:VDA:mainnet:OxCDEdd96AfA6956f0299580225C2d9a52aca8487A
                  </div>
                </div>
              </Link>
            </Slide>
          )}
        </div>
        <SearchAccount />
      </div>
      <Separator className="mt-10 bg-white/20" />
    </>
  );
};

export default NetworkExplorer;
