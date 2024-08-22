"use client"

import { MenuIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { NetworkSwitcherNavigationMenu } from "@/app/_components/network-switcher-navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getIdentitiesPageRoute,
  getNodesPageRoute,
} from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AppHeaderNavBarProps = Omit<React.ComponentProps<"nav">, "children">

const navItems = [
  {
    label: "Identities",
    path: getIdentitiesPageRoute(),
  },
  {
    label: "Nodes",
    path: getNodesPageRoute(),
  },
]

export function AppHeaderNavBar(props: AppHeaderNavBarProps) {
  const { className, ...navProps } = props

  const pathname = usePathname()

  return (
    <nav {...navProps} className={cn("h-full", className)}>
      <ul className="flex h-full flex-row items-stretch gap-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <div className="h-full py-2">
              <Link
                href={item.path}
                className={cn(
                  "flex h-full flex-col justify-center px-2 hover:text-foreground",
                  pathname.startsWith(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function AppHeaderNavMenu() {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group">
        <Button variant="ghost" className="h-auto px-2">
          <div className="hidden group-data-[state=open]:block">
            <XIcon className="size-6" />
            <span className="sr-only">Close navigation menu</span>
          </div>
          <div className="hidden group-data-[state=closed]:block">
            <MenuIcon className="size-6" />
            <span className="sr-only">Open navigation menu</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={17}
        className="h-[calc(100dvh_-_73px)] w-screen overflow-y-auto rounded-none border-none bg-transparent p-4 shadow-none"
      >
        <nav className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <DropdownMenuItem
                asChild
                key={item.path}
                className={cn(
                  "cursor-pointer rounded-sm p-3 text-base leading-tight",
                  pathname.startsWith(item.path) ? "bg-foreground/5" : ""
                )}
              >
                <Link href={item.path}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </div>
          <NetworkSwitcherNavigationMenu />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
