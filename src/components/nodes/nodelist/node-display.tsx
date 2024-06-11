import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import React from "react";

const NodeDisplay = ({
  number,
  className = "",
}: {
  number: number;
  className?: string;
}) => {
  return (
    <Link
    href="/nodes/details/1234223"
      className={cn(
        "py-2 px-4  rounded-[18px] bg-[#8566F2] [box-shadow:0px_4px_24px_0px_#8566F2CC] w-fit",
        className
      )}
    >
      {number}
    </Link>
  );
};

export default NodeDisplay;
