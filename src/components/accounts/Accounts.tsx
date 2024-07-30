"use client";

import React, { useEffect, useState } from "react";
// import { accounts } from "@/lib/sample";
import { columns } from "./account/column";
import DataTable from "../common/table";
import { useQuery } from "react-query";
import {
  getAnyPublicProfile,
  getDidDocument,
  paginateDids,
} from "@/lib/utils/veridaUtils";
import { useToast } from "../ui/use-toast";
import { getDIDs, activeDIDCount } from "@verida/vda-did-resolver";
import { config } from "@/lib/config";
import { BlockchainAnchor } from "@verida/types";
import Loader from "../common/loader";
import { ColumnDef } from "@tanstack/react-table";
import { Account } from "@/types/account";

const Accounts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    const getDIDCount = async () => {
      const res = await activeDIDCount(BlockchainAnchor.POLPOS);

      if (res) setCount(res);
    };

    getDIDCount();
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["accounts", page, limit],
    async () => {
      let dids = await getDIDs(
        BlockchainAnchor.POLPOS,
        (page - 1) * limit,
        limit,
        true
      );

      // revert orders for `createdAt` desc
      dids.reverse();

      const profiles = await Promise.all(
        dids.map(async (did: string) => {
          try {
            const didDocument = (await getDidDocument(did)) as any;
            const profile = await getAnyPublicProfile(config.client, did);

            return {
              ...profile,
              did: did,
              createdAt: didDocument?.created,
            };
          } catch (error) {
            console.error(`Failed to get profile for DID: ${did}`, error);
            return null; // or handle the error as needed
          }
        })
      );

      return profiles.filter(
        (profile) => !!profile
      );
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch accounts",
        });
        console.log(error);
      },
      onSuccess: (data) => {
        if (data.length === 0) {
          toast({
            variant: "destructive",
            description: "Failed to fetch accounts",
          });
        }
      },
    }
  );

  const validData = data ?? [];

  return (
    <div className="flex flex-col gap-6 sm:mb-12">
      <DataTable
        columns={columns}
        data={validData}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        title="accounts"
        totalCount={count}
        onApplyFilters={() => {}}
        isLoading={isLoading}
        showSearch={false}
      />
    </div>
  );
};

export default Accounts;
