"use client";

import React, { useState } from "react";
import { accounts } from "@/lib/sample";
import { columns } from "./account/column";
import DataTable from "../common/table";
import { useQuery } from "react-query";
import { getAnyPublicProfile, paginateDids } from "@/lib/utils/veridaUtils";
import { useToast } from "../ui/use-toast";
import { getDIDs } from "@verida/vda-did-resolver";
import { config } from "@/lib/config";
import { BlockchainAnchor } from "@verida/types";


const Accounts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { toast } = useToast();
  const { data, isLoading, isError } = useQuery(
    ["accounts", page],
    async () => {
      // return await paginateDids(page, limit);
      const dids = await getDIDs(BlockchainAnchor.POLAMOY, page, limit);
      console.log(dids);
      const profiles = await Promise.all(dids.map(async (didOrUsername: string) => {
        try {
          return await getAnyPublicProfile(config.client, didOrUsername);
        } catch (error) {
          console.error(`Failed to get profile for DID: ${didOrUsername}`, error);
          return null; // or handle the error as needed
        }
      }));
    
      return profiles.filter(profile => profile !== null);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch accounts",
        });
        console.log(error);
      },
    }
  );
  return (
    <div className="flex flex-col gap-6 sm:mb-12">
      <DataTable
        columns={columns}
        data={accounts}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        title="accounts"
        totalCount={60}
      />
    </div>
  );
};

export default Accounts;
