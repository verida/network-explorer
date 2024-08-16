"use client"

import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { useCallback, useState } from "react"

import { NetworkSwitcherDropdownMenu } from "@/app/_components/network-switcher-dropdown-menu"
import { NetworkSwitcherNavigationMenu } from "@/app/_components/network-switcher-navigation-menu"
import MenuIcon from "@/assets/svg/menu-icon.svg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getIdentitiesPageRoute,
  getNodesPageRoute,
  getRootPageRoute,
} from "@/features/routes/utils"
import { cn } from "@/styles/utils"

const navigationItems = [
  {
    name: "Identities",
    path: getIdentitiesPageRoute(),
  },
  {
    name: "Nodes",
    path: getNodesPageRoute(),
  },
]

export type AppHeaderProps = Omit<React.ComponentProps<"header">, "children">

export function AppHeader(props: AppHeaderProps) {
  const { className, ...headerProps } = props

  const pathname = usePathname()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleClickNavigationLink = useCallback(() => {
    setIsDropdownOpen(false)
  }, [])

  return (
    <header
      {...headerProps}
      className={cn(
        "flex h-[73px] flex-row justify-center border-b border-border backdrop-blur-2xl",
        isDropdownOpen ? "w-screen bg-[#060520]" : "",
        className
      )}
    >
      <div className="flex w-full max-w-screen-xl flex-row items-center justify-between px-4 sm:px-8">
        <div className="flex flex-row items-stretch gap-4 sm:gap-10">
          <DropdownMenu onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
            {isDropdownOpen ? (
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
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
            <DropdownMenuContent className="mt-[4rem] h-[calc(100dvh-4rem)] w-screen overflow-y-auto rounded-none border-none bg-[#060520] p-4">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-1">
                  {navigationItems.map((navigationItem) => (
                    <Link
                      href={navigationItem.path}
                      key={navigationItem.name}
                      className={cn(
                        "cursor-pointer rounded p-3 text-foreground hover:bg-foreground/10",
                        pathname.startsWith(navigationItem.path)
                          ? "bg-foreground/10"
                          : ""
                      )}
                      onClick={handleClickNavigationLink}
                    >
                      {navigationItem.name}
                    </Link>
                  ))}
                </div>
                <NetworkSwitcherNavigationMenu />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={getRootPageRoute()} className="py-[1.375rem]">
            <Image
              src="/logo.svg"
              className="h-7 w-auto"
              alt="Verida Network logo"
              width={96}
              height={32}
            />
          </Link>
          <div className="hidden flex-row items-stretch gap-10 sm:flex">
            {navigationItems.map((navigationItem) => (
              <Link
                href={navigationItem.path}
                key={navigationItem.name}
                className={cn(
                  "flex flex-col justify-center hover:text-foreground",
                  pathname.startsWith(navigationItem.path)
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
        <div className="flex flex-row gap-3">
          <NetworkSwitcherDropdownMenu className="hidden sm:block" />
        </div>
      </div>
    </header>
  )
}

export type AppHeaderOffsetProps = Omit<React.ComponentProps<"div">, "children">

export function AppHeaderOffset(props: AppHeaderOffsetProps) {
  const { className, ...divProps } = props
  return <div {...divProps} className={cn("mt-[73px]", className)} />
}
