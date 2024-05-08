"use client";

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
import { usePathname } from "next/navigation";

const Navbar = () => {
  const navs = [
    { name: "Accounts", paths: ["/", "/search"] },
    {
      name: "Nodes",
      paths: ["/nodes", "/nodes/details"],
    },
  ];
  const pathname = usePathname();

  return (
    <div className="border-b border-white/15 lg:px-[112px] px-8 py-5 flex justify-between w-full">
      <div className="flex gap-10 items-center">
        <img src="/logo.png" className="w-[100px] cursor-pointer" alt="logo" />
        {navs.map((nav) => (
          <Link
            href={nav.paths[0]}
            key={nav.name}
            className={cn(
              "font-semibold text-[14px] leading-[17.64px] cursor-pointer md:block hidden",
              !nav.paths.includes(pathname) ? "text-white/30" : "text-white"
            )}
          >
            {nav.name}
          </Link>
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
            <Link
              href={nav.paths[0]}
              key={nav.name}
              className="hover:bg-background hover:text-foreground cursor-pointer p-3"
            >
              {nav.name}
            </Link>
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
