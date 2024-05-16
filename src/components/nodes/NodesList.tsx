"use client";

import React from "react";
import { DataTable } from "./nodelist/data-table";
import { columns } from "./nodelist/column";
import { nodes } from "@/lib/sample";

const NodesList = () => {
  return (
    <div className="flex flex-col gap-4 my-10">
      <DataTable
        data={nodes}
        columns={columns}
      />
    </div>
  );
};

export default NodesList;
