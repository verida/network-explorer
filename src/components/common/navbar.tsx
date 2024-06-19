"use client";

import { cn } from "@/lib/utils";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectWalletButton from "./connect-wallet";
import ConnectedWallet from "./connected-wallet";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, showSearchBarAtom } from "@/lib/atom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { X } from "lucide-react";
import VeridaIcon from "@/assets/svg/verida.svg";
import { Input } from "../ui/input";
import { LuSearch } from "react-icons/lu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Navbar = () => {
  const navs = [
    { name: "Accounts", paths: ["/", "/search"] },
    {
      name: "Nodes",
      paths: ["/nodes", "/nodes/details"],
    },
  ];
  const pathname = usePathname();

  const user = useRecoilValue(userAtom);
  const [showSearchField, setShowSearchField] =
    useRecoilState(showSearchBarAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  return showSearchField ? (
    <div
      className="w-screen h-screen fixed top-0 bg-[#060520] z-50"
      onClick={() => {
        setTimeout(() => {
          setShowSearchField(false);
        }, 100);
      }}
    >
      <div className="border-b border-white/10 p-4 flex justify-between items-center gap-3">
        <div className="border border-white/60 px-3 flex rounded-sm items-center w-full">
          <LuSearch size={22} />
          <Separator
            orientation="vertical"
            className="ml-2 h-5 bg-[#8566F2] w-0.5 rounded"
          />
          <Input
            className="bg-transparent hover:bg-transparent border-none focus-visible:ring-0 rounded-none text-white"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            autoFocus
          />
        </div>
        <Button
          variant="ghost"
          className="font-bold text-[14px] leading-[20px] text-white p-0"
          onClick={() => {
            setSearch("");
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        "md:border-b border-white/15",
        isDropdownOpen || showSearchField ? "bg-[#060520] w-screen" : ""
      )}
    >
      <div className="max-w-[1300px] mx-auto flex justify-between lg:px-[92px] md:px-8 px-4">
        <div className="flex lg:gap-10 gap-4 items-center">
          <DropdownMenu onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
            {isDropdownOpen ? (
              <X
                className="text-white cursor-pointer h-5 w-5"
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              />
            ) : (
              <DropdownMenuTrigger className="md:hidden block">
                <IoMenu size={24} />
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className="flex flex-col gap-1 w-screen bg-[#060520] border-none rounded-none overflow-y-auto h-[calc(100vh-4rem)] mt-[4rem] p-4">
              {[
                ...navs,
                ...(user.registered
                  ? [
                      {
                        name: "My Node Hub",
                        paths: ["/my-node-hub"],
                      },
                    ]
                  : []),
              ].map((nav) => (
                <Link
                  href={nav.paths[0]}
                  key={nav.name}
                  className={cn(
                    "hover:bg-white/10 rounded text-white cursor-pointer p-3",
                    nav.paths.includes(pathname) ? "bg-white/10" : ""
                  )}
                >
                  {nav.name}
                </Link>
              ))}
              <DropdownMenuSeparator className="bg-white/10" />
              <div className="text-semibold mt-2 text-[14px] leading-[17.64px] flex items-center gap-2 text-white/30">
                <VeridaIcon />
                <span>VDA Price: $245</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/">
            <img
              src="/logo.svg"
              className="lg:w-[100px] w-[70px] cursor-pointer"
              alt="logo"
            />
          </Link>
          <div className="hidden md:flex lg:gap-10 gap-4 items-center">
            {navs.map((nav) => (
              <Link
                href={nav.paths[0]}
                key={nav.name}
                className={cn(
                  "font-semibold text-[14px] leading-[17.64px] cursor-pointer block",
                  nav.paths.includes(pathname) ? "text-white" : "text-white/30"
                )}
              >
                {nav.name}
              </Link>
            ))}
            {user.registered && (
              <Link
                href="/my-node-hub"
                className={cn(
                  "font-semibold text-[14px] leading-[17.64px] cursor-pointer block",
                  pathname === "/my-node-hub" ? "text-white" : "text-white/30",
                  "lg:pl-8 pl-3 border-l-2 py-2 border-white/15"
                )}
              >
                My Node Hub
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center lg:gap-6 gap-3 md:py-5 py-4">
          <div className="text-semibold md:block hidden text-[14px] leading-[17.64px] text-white/30 cursor-pointer">
            VDA Price: $245
          </div>
          <div>
            {user.registered ? <ConnectedWallet /> : <ConnectWalletButton />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
