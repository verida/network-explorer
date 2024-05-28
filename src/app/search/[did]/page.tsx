"use client";

import React from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import ResultBox from "@/components/search/ResultBox";
import { useParams } from "next/navigation";

const SearchPage = () => {
  const [searchBoxVisible, setSearchBoxVisible] = useState(true);
  const params = useParams();
  const did = decodeURIComponent(params.did as unknown as string);
  return (
    params.did && (
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
        <ResultBox did={(did as string) ?? ""} />
      </div>
    )
  );
};

export default SearchPage;
