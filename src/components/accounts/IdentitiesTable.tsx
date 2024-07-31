"use client";

import React, { useEffect, useMemo, useState } from "react";
// import { accounts } from "@/lib/sample";
import { columns } from "./account/column";
import DataTable from "../common/table";
import { useQuery } from "react-query";
import { getAnyPublicProfile, getDidDocument } from "@/lib/utils/veridaUtils";
import { useToast } from "../ui/use-toast";
import { getDIDs, activeDIDCount } from "@verida/vda-did-resolver";
import { Identity } from "@/types";
import { Logger } from "@/features/logger";
import { client as veridaClient } from "@/features/verida";
import { getDidRegistryBlockchainForNetwork } from "@/features/identities/utils";
import { clientEnvVars } from "@/config/client";

const logger = Logger.create("<IdentitiesTable>");

const fallbackData: Identity[] = [];

export function IdentitiesTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    const getDIDCount = async () => {
      const didRegistryBlockchain = getDidRegistryBlockchainForNetwork(
        clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
      );
      const res = await activeDIDCount(didRegistryBlockchain);

      if (res) setCount(res);
    };

    getDIDCount();
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["identities", page, limit],
    async () => {
      const didRegistryBlockchain = getDidRegistryBlockchainForNetwork(
        clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
      );

      let dids = await getDIDs(
        didRegistryBlockchain,
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
            const profile = await getAnyPublicProfile(veridaClient, did);

            return {
              ...profile,
              did: did,
              createdAt: didDocument?.created,
            };
          } catch (error) {
            logger.error(
              new Error(`Failed to get profile for DID: ${did}`, {
                cause: error,
              })
            );
            return null; // or handle the error as needed
          }
        })
      );

      return profiles.filter((profile) => !!profile);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch identities",
        });
        logger.error(error);
      },
      onSuccess: (data) => {
        if (data.length === 0) {
          toast({
            variant: "destructive",
            description: "Failed to fetch identities",
          });
        }
      },
    }
  );

  const validData = useMemo(() => data ?? fallbackData, [data]);

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={columns}
        data={validData}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        title="identities"
        totalCount={count}
        onApplyFilters={() => {}}
        isLoading={isLoading}
        showSearch={false}
      />
    </div>
  );
}
