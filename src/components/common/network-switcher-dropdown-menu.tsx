"use client"

import React, { useCallback, useState } from "react"
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa"

import NetworkIcon from "@/assets/icons/network-icon.svg"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NETWORKS } from "@/features/networks/constants"
import { NetworkDef } from "@/features/networks/types"
import { getCurrentNetwork } from "@/features/networks/utils"

const networks = Object.values(NETWORKS)
const currentNetwork = getCurrentNetwork()

export type NetworkSwitcherDropdownMenuProps = React.ComponentProps<"div">

export function NetworkSwitcherDropdownMenu(
  props: NetworkSwitcherDropdownMenuProps
) {
  const { ...divProps } = props

  const [menuOpen, setOpen] = useState(false)

  const toggleOpenMenu = useCallback(() => setOpen((prev) => !prev), [])

  return (
    <div {...divProps}>
      <DropdownMenu open={menuOpen} onOpenChange={toggleOpenMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border-15">
            <div className="flex flex-row items-center gap-2">
              <NetworkIcon className="size-4" />
              {currentNetwork.label}
              {menuOpen ? (
                <FaChevronUp size={16} />
              ) : (
                <FaChevronDown size={16} />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {networks.map((network) => (
            <>
              {network.id === currentNetwork.id ? (
                <ActiveNetworkMenuItem network={network} />
              ) : (
                <NetworkMenuItem network={network} />
              )}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

type NetworkMenuItemProps = {
  network: NetworkDef
}

function NetworkMenuItem(props: NetworkMenuItemProps) {
  const { network } = props

  return (
    <DropdownMenuItem asChild key={network.id} className="cursor-pointer">
      <a href={network.explorerUrl} target="_blank" rel="noopener noreferrer">
        {network.longLabel}
      </a>
    </DropdownMenuItem>
  )
}

function ActiveNetworkMenuItem(props: NetworkMenuItemProps) {
  const { network } = props

  return (
    <DropdownMenuItem key={network.id} className="hover:bg-transparent">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <span>{network.longLabel}</span>
        <FaCheck size={14} className="size-4" />
      </div>
    </DropdownMenuItem>
  )
}
