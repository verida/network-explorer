"use client";

import React from "react";

import { accounts } from "@/lib/sample";

import { DataTable } from "./account/data-table";
import { columns } from "./account/column";

const Accounts = () => {
  return (
    <div className="flex flex-col gap-6 mb-12">
      <DataTable columns={columns} data={accounts} />
    </div>
  );
};

export default Accounts;
