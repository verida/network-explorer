"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback, useState } from "react"

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
      <ul className="flex h-full flex-row items-stretch gap-10">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={cn(
                "flex h-full flex-col justify-center hover:text-foreground",
                pathname.startsWith(item.path)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export type AppHeaderNavMenuProps = Omit<
  React.ComponentProps<typeof DropdownMenuTrigger>,
  "children"
>

export function AppHeaderNavMenu(props: AppHeaderNavMenuProps) {
  const { ...triggerProps } = props

  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleClickNavigationLink = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger {...triggerProps}>
        {isOpen ? (
          <X className="aspect-square w-7" />
        ) : (
          <MenuIcon className="aspect-square w-7" width="100%" height="100%" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={1}
        className="h-[calc(100dvh_-_73px)] w-screen overflow-y-auto rounded-none border-none bg-transparent p-4 shadow-none"
      >
        <nav className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className={cn(
                  "cursor-pointer rounded-sm p-3 text-foreground hover:bg-foreground/10",
                  pathname.startsWith(item.path) ? "bg-foreground/10" : ""
                )}
                onClick={handleClickNavigationLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <NetworkSwitcherNavigationMenu />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
