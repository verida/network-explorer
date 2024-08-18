import Link from "next/link"
import React from "react"

import {
  AppHeaderNavBar,
  AppHeaderNavMenu,
} from "@/app/_components/app-header-nav"
import { NetworkSwitcherDropdownMenu } from "@/app/_components/network-switcher-dropdown-menu"
import AppLogo from "@/assets/logos/app-logo.svg"
import { getRootPageRoute } from "@/features/routes/utils"
import { cn } from "@/styles/utils"

export type AppHeaderProps = Omit<React.ComponentProps<"header">, "children">

export function AppHeader(props: AppHeaderProps) {
  const { className, ...headerProps } = props

  return (
    <header
      {...headerProps}
      className={cn(
        "flex h-[73px] flex-row justify-center border-b border-border backdrop-blur-2xl",
        className
      )}
    >
      <div className="flex w-full max-w-screen-xl flex-row items-center justify-between px-4 sm:px-8">
        <div className="flex h-full flex-row items-stretch gap-4 sm:gap-10">
          <AppHeaderNavMenu className="block sm:hidden" />
          <Link
            href={getRootPageRoute()}
            className="flex flex-col justify-center"
          >
            <AppLogo className="h-7 w-auto" height="100%" width="100%" />
          </Link>
          <AppHeaderNavBar className="hidden sm:block" />
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
