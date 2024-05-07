import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoMenu } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const Navbar = () => {
  const navs = ["Accounts", "Nodes"];
  return (
    <div className="border-b border-white/15 lg:px-[112px] px-8 py-5 flex justify-between w-full z-50">
      <div className="flex gap-10 items-center">
        <Link href="/">
          <img src="/logo.svg" className="w-[100px] cursor-pointer" alt="logo" />
        </Link>
        {navs.map((nav) => (
          <div
            key={nav}
            className={cn(
              "font-semibold text-[14px] leading-[17.64px] cursor-pointer md:block hidden",
              nav === "Nodes" ? "text-white/30" : "text-white"
            )}
          >
            {nav}
          </div>
        ))}
      </div>
      <div className="md:flex hidden items-center gap-6">
        <div className="text-semibold text-[14px] leading-[17.64px] text-white/30 cursor-pointer">
          VDA Price: $245
        </div>
        <Button className="rounded-lg px-6 py-[14px] leading-5 font-semibold text-[14px] ">
          Connect Wallet
        </Button>
      </div>
      <Popover>
        <PopoverTrigger className="md:hidden block">
          <IoMenu size={24} />
        </PopoverTrigger>
        <PopoverContent className="bg-white/10 border-white/30 border gap-3 flex flex-col p-0 overflow-hidden">
          {navs.map((nav) => (
            <div key={nav} className="hover:bg-background hover:text-foreground cursor-pointer p-3">{nav}</div>
          ))}
          <Button className="rounded-lg px-6 py-[14px] leading-5 font-semibold text-[14px] mx-3 mb-3">
            Connect Wallet
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
