import Distribution from "@/components/nodes/Distribution";
import NodesList from "@/components/nodes/NodesList";
import React from "react";
import Overview from "@/components/nodes/overview";

const NodesPage = () => {
  return (
    <div className="py-6">
      <Overview />
      <Distribution />
      <NodesList />
    </div>
  );
};

export default NodesPage;
