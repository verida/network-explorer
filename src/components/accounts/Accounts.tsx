"use client";

import React from "react";

import { accounts } from "@/lib/sample";

import { DataTable } from "./account/data-table";
import { columns } from "./account/column";
import { Separator } from "../ui/separator";

const Accounts = () => {
  return (
    <div className="flex flex-col gap-6 sm:mb-12">
      <DataTable columns={columns} data={accounts} />
    </div>
  );
};

export default Accounts;
