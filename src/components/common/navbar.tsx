"use client";

import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, showSearchBarAtom } from "@/lib/atom";
import { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { LuSearch } from "react-icons/lu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import MenuIcon from "@/assets/svg/menu-icon.svg";
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

  const handleClickNavigationLink = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  return showSearchField ? (
    <div
      className="fixed top-0 z-50 h-screen w-screen bg-[#060520]"
      onClick={() => {
        setTimeout(() => {
          setShowSearchField(false);
        }, 100);
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
        <div className="flex w-full items-center rounded-sm border border-white/60 px-3">
          <LuSearch size={22} />
          <Separator
            orientation="vertical"
            className="ml-2 h-5 w-0.5 rounded bg-[#8566F2]"
          />
          <Input
            className="rounded-none border-none bg-transparent text-white hover:bg-transparent focus-visible:ring-0"
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
          className="p-0 text-[14px] font-bold leading-[20px] text-white"
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
        "border-white/15 md:border-b",
        isDropdownOpen || showSearchField ? "w-screen bg-[#060520]" : ""
      )}
    >
      <div className="mx-auto flex max-w-[1300px] justify-between px-4 md:px-8 lg:px-[92px]">
        <div className="flex items-center gap-4 lg:gap-10">
          <DropdownMenu onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
            {isDropdownOpen ? (
              <X
                className="h-[28px] w-[28px] cursor-pointer text-white"
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              />
            ) : (
              <DropdownMenuTrigger className="block md:hidden">
                <MenuIcon className="mx-auto h-[28px] w-[28px] rounded-sm object-cover sm:mx-0" />
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className="mt-[4rem] flex h-[calc(100vh-4rem)] w-screen flex-col gap-1 overflow-y-auto rounded-none border-none bg-[#060520] p-4">
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
                    "cursor-pointer rounded p-3 text-white hover:bg-white/10",
                    nav.paths.includes(pathname) ? "bg-white/10" : ""
                  )}
                  onClick={handleClickNavigationLink}
                >
                  {nav.name}
                </Link>
              ))}
              {/* <DropdownMenuSeparator className="bg-white/10" />
              <div className="text-semibold mt-2 flex items-center gap-2 text-[14px] leading-[17.64px] text-white/30">
                <VeridaIcon />
                <span>VDA Price: $245</span>
              </div> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/">
            <Image
              src="./logo.svg"
              className="w-[85px] cursor-pointer lg:w-[100px]"
              alt="Verida Network logo"
              width={96}
              height={32}
            />
          </Link>
          <div className="hidden items-center gap-4 md:flex lg:gap-10">
            {navs.map((nav) => (
              <Link
                href={nav.paths[0]}
                key={nav.name}
                className={cn(
                  "block cursor-pointer text-[14px] font-semibold leading-[17.64px]",
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
                  "block cursor-pointer text-[14px] font-semibold leading-[17.64px]",
                  pathname === "/my-node-hub" ? "text-white" : "text-white/30",
                  "border-l-2 border-white/15 py-2 pl-3 lg:pl-8"
                )}
              >
                My Node Hub
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 md:py-5 lg:gap-6">
          {/* <div className="text-semibold hidden cursor-pointer text-[14px] leading-[17.64px] text-white/30 md:block">
            VDA Price: $245
          </div> */}
          <div className="p-5">
            {/* {user.registered ? <ConnectedWallet /> : <ConnectWalletButton />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
