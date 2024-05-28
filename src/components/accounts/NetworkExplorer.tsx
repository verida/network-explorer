"use client";

import React, { useState } from "react";
import SearchAccount from "@/assets/svg/search-account.svg";
import { Button } from "../ui/button";
import SearchIcon from "@/assets/icons/search.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Profile } from "@/types/profile";
import { VeridaHelper } from "@/lib/verida";
import { useToast } from "../ui/use-toast";
import { Oval } from "react-loader-spinner";

const NetworkExplorer = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fetchProfile = async (did: string) => {
    if (did && did.length > 0) {
      setLoading(true);
      try {
        await VeridaHelper.getDidDocument(did);
        await VeridaHelper.getProfile(did);
        setProfile(VeridaHelper.profile);
      } catch (error: any) {
        console.log(error);
        // Check if DID document was found
        if (VeridaHelper.didDocument) {
          setProfile({
            name: "unknown",
            avatar: { uri: "" },
            country: "",
            did,
          });
        } else {
          toast({
            title: "Profile not found",
            description: "The profile you are looking for does not exist",
          });
          setProfile(undefined);
        }
      } finally {
        setLoading(false);
      }
    } else {
      VeridaHelper.reset();
      setProfile(undefined);
    }
  };

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
                onChange={async (e) => {
                  await fetchProfile(e.target.value);
                }}
                className="bg-transparent focus:border-none focus:outline-none w-[80%]"
              />
            </div>

            <Button
              onClick={() => {}}
              className="md:rounded-lg rounded-sm h-[48px] md:w-[94px] w-full font-semibold text-[14px] leading-[17.64px] md:py-3 py-2.5 md:pl-6 md:pr-5"
            >
              Search
            </Button>
          </div>
          {(loading || profile) && (
            <div className="flex gap-4 w-full bg-[#333153] border border-white/60 py-6 px-4 rounded-lg absolute bottom-[-120px]">
              {profile ? (
                <Link href={`/search/${profile.did}`}>
                  <img
                    src={profile?.avatar.uri}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex flex-col gap-1.5 break-words lg:w-full w-[calc(100%-50px)]">
                    <div className="font-bold text-[14px] leading-[17.64px]">
                      {profile.name}
                    </div>
                    <div className="font-normal text-[14px] leadig-[17.64px]">
                      {profile.did}
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
            </div>
          )}
        </div>
        <SearchAccount />
      </div>
      <Separator className="mt-10 md:block hidden bg-white/20" />
    </>
  );
};

export default NetworkExplorer;
