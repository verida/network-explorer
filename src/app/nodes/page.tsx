import Distribution from "@/components/nodes/Distribution";
import React from "react";
import Overview from "@/components/nodes/overview";

const NodesPage = () => {
  return (
    <div className="py-6">
      <Overview />
      <Distribution />
    </div>
  );
};

export default NodesPage;
