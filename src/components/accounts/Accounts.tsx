"use client";

import React, { useState } from "react";
import { accounts } from "@/lib/sample";
import { columns } from "./account/column";
import DataTable from "../common/table";
import { useQuery } from "react-query";
import { paginateDids } from "@/lib/utils/veridaUtils";
import { useToast } from "../ui/use-toast";

const Accounts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { toast } = useToast();
  const { data, isLoading, isError } = useQuery(
    ["accounts", page],
    async () => {
      return await paginateDids(page, limit);
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
