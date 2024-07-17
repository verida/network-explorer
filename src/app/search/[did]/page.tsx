"use client";

import React from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import ResultBox from "@/components/search/ResultBox";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { WebUserProfile } from "@verida/web-helpers";
import { useToast } from "@/components/ui/use-toast";
import { getAnyPublicProfile } from "@/lib/utils/veridaUtils";
import { config } from "@/lib/config";
import Loader from "@/components/common/loader";

const SearchPage = () => {
  const [searchBoxVisible, setSearchBoxVisible] = useState(true);
  const params = useParams();
  const did = decodeURIComponent(params.did as unknown as string);

  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery<WebUserProfile>(
    ["accounts", did],
    async () => {
      return await getAnyPublicProfile(config.client, did);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: params.did !== undefined,
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch profile",
        });
      },
    }
  );

  console.log(profile);
  

  return (
    params.did &&
    (isLoading ? (
      <Loader isLoading={isLoading} className="h-screen" />
    ) : (
      <div className="my-6 flex flex-col gap-10">
        {searchBoxVisible && (
          <div className="network-search border border-white/60 py-2 px-4 rounded-lg flex items-center gap-2 h-[64px]">
            <SearchIcon />
            <div className="font-normal text-[16px] w-full truncate sm:border-none border-r-2 border-[#8566F2]">
              {did}
            </div>
            <IoMdClose
              className="cursor-pointer h-5 w-5 text-white"
              onClick={() => setSearchBoxVisible(false)}
            />
          </div>
        )}
        <ResultBox
          profile={{
            ...profile,
            did,
          }}
        />
      </div>
    ))
  );
};

export default SearchPage;
