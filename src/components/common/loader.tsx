import { cn } from "@/lib/utils/utils";
import React from "react";
import { useEffect, useState } from "react";

const Loader = ({ className = "" }: { className?: string }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);
  return (
    loading && (
      <div
        className={cn(
          `flex items-center justify-center ${
            typeof global.window === "undefined" ? "flex" : "hidden"
          }`,
          className
        )}
      >
        Loading...
      </div>
    )
  );
};

export default Loader;
