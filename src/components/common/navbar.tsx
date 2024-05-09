"use client";

import React, { useEffect, useState } from "react";
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
import ConnectWalletButton from "./connect-wallet";
import ConnectedWallet from "./connected-wallet";

const Navbar = () => {
  const navs = [
    { name: "Accounts", paths: ["/", "/search"] },
    {
      name: "Nodes",
      paths: ["/nodes", "/nodes/details"],
    },
  ];
  const pathname = usePathname();
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setConnected(!connected);
    }, 3000)
  }, [connected])

  return (
    <div className="border-b border-white/15 lg:px-[112px] px-8 py-5 flex justify-between w-full">
      <div className="flex gap-10 items-center">
        <img src="/logo.svg" className="w-[100px] cursor-pointer" alt="logo" />
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
        {connected ? <ConnectedWallet /> : <ConnectWalletButton />}
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
          {connected ? <ConnectedWallet /> : <ConnectWalletButton />}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
