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
      <Separator className="sm:hidden bg-white/20 mt-8 mb-1"/>
    </div>
  );
};

export default Accounts;
