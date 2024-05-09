import React from "react";
import NodeDisplay from "./nodelist/node-display";

const Distribution = () => {
  return (
    <div className="relative bg-[url('/graph.png')] w-full h-[532px] bg-opacity-70 mt-7 rounded-lg border border-white/20">
      <NodeDisplay className="top-[180px] left-16" number={5} />
      <NodeDisplay className=" right-[180px] top-16" number={3} />
      <NodeDisplay className="top-[100px] left-[500px]" number={2}/>
    </div>
  );
};

export default Distribution;
