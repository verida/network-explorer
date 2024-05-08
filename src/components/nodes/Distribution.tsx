import React from "react";

const Distribution = () => {
  return (
    <div className="relative bg-[url('/graph.png')] w-full h-[532px] bg-opacity-70">
      <div className="py-2 top-[180px] left-16 px-4 absolute rounded-[18px] bg-[#8566F2] [box-shadow:0px_4px_24px_0px_#8566F2CC] w-fit">
        5
      </div>
      <div className="py-2 right-[180px] top-16 px-4 absolute rounded-[18px] bg-[#8566F2] [box-shadow:0px_4px_24px_0px_#8566F2CC] w-fit">
        1
      </div>
      <div className="py-2 top-[100px] left-[500px] px-4 absolute rounded-[18px] bg-[#8566F2] [box-shadow:0px_4px_24px_0px_#8566F2CC] w-fit">
        4
      </div>
    </div>
  );
};

export default Distribution;
