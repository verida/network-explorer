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

const navigationItems = [
  { name: "Identities", paths: ["/", "/search"] },
  {
    name: "Nodes",
    paths: ["/nodes", "/nodes/details"],
  },
];

export type HeaderProps = Omit<React.ComponentProps<"header">, "children">;

export const Header: React.FC<HeaderProps> = (props) => {
  const { className, ...headerProps } = props;

  const pathname = usePathname();

  const [showSearchField, setShowSearchField] =
    useRecoilState(showSearchBarAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleClickNavigationLink = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  return showSearchField ? (
    // TODO: Move it somewhere else but it doesn't belong here
    <div
      className="fixed top-0 z-50 h-screen w-screen bg-[#060520]"
      onClick={() => {
        setTimeout(() => {
          setShowSearchField(false);
        }, 100);
      }}
    >
      <div className="border-border-10 flex items-center justify-between gap-3 border-b p-4">
        <div className="border-border-60 flex w-full items-center rounded-sm border px-3">
          <LuSearch size={22} />
          <Separator
            orientation="vertical"
            className="ml-2 h-5 w-0.5 rounded bg-[#8566F2]"
          />
          <Input
            className="rounded-none border-none bg-transparent text-foreground hover:bg-transparent focus-visible:ring-0"
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
          className="p-0 text-[14px] font-bold leading-[20px] text-foreground"
          onClick={() => {
            setSearch("");
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  ) : (
    <header
      {...headerProps}
      className={cn(
        "flex flex-row justify-center",
        isDropdownOpen || showSearchField ? "w-screen bg-[#060520]" : "",
        className
      )}
    >
      <div className="flex w-full max-w-screen-xl flex-row items-center justify-between px-4 sm:px-8">
        <div className="flex flex-row items-stretch gap-4 sm:gap-10">
          <DropdownMenu onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
            {isDropdownOpen ? (
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <X className="aspect-square w-7" />
              </button>
            ) : (
              <DropdownMenuTrigger className="block sm:hidden">
                <MenuIcon
                  className="aspect-square w-7"
                  width="100%"
                  height="100%"
                />
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className="mt-[4rem] flex h-[calc(100vh-4rem)] w-screen flex-col gap-1 overflow-y-auto rounded-none border-none bg-[#060520] p-4">
              {navigationItems.map((navigationItem) => (
                <Link
                  href={navigationItem.paths[0]}
                  key={navigationItem.name}
                  className={cn(
                    "cursor-pointer rounded p-3 text-foreground hover:bg-white/10",
                    navigationItem.paths.includes(pathname) ? "bg-white/10" : ""
                  )}
                  onClick={handleClickNavigationLink}
                >
                  {navigationItem.name}
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/" className="py-[1.375rem]">
            <Image
              src="./logo.svg"
              className="aspect-[1/3] h-7"
              alt="Verida Network logo"
              width={96}
              height={32}
            />
          </Link>
          <div className="hidden flex-row items-stretch gap-10 sm:flex">
            {navigationItems.map((navigationItem) => (
              <Link
                href={navigationItem.paths[0]}
                key={navigationItem.name}
                className={cn(
                  "flex flex-col justify-center hover:text-foreground",
                  navigationItem.paths.includes(pathname)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span className="text-[14px] font-semibold leading-[17.64px]">
                  {navigationItem.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
