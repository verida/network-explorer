import { Check, SquareArrowOutUpRight } from "lucide-react"
import React from "react"

import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { NETWORKS } from "@/features/networks/constants"
import { NetworkDef } from "@/features/networks/types"
import { getCurrentNetwork } from "@/features/networks/utils"

export type NetworkSwitcherNavigationMenuProps = React.ComponentProps<"div">

const networks = Object.values(NETWORKS)
const currentNetwork = getCurrentNetwork()

export function NetworkSwitcherNavigationMenu(
  props: NetworkSwitcherNavigationMenuProps
) {
  const { ...divProps } = props

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-2">
        <DropdownMenuLabel className="p-0 text-base font-normal text-muted-foreground">
          Explorers
        </DropdownMenuLabel>
        <div className="flex flex-col gap-1">
          {networks.map((network) => (
            <React.Fragment key={network.id}>
              {network.id === currentNetwork.id ? (
                <ActiveNetworkMenuItem network={network} />
              ) : (
                <NetworkMenuItem network={network} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

type NetworkMenuItemProps = {
  network: NetworkDef
}

function NetworkMenuItem(props: NetworkMenuItemProps) {
  const { network } = props

  return (
    <DropdownMenuItem asChild className="cursor-pointer rounded-sm p-3">
      <a href={network.explorerUrl} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">{network.longLabel}</span>
          <SquareArrowOutUpRight size={14} className="text-muted-foreground" />
        </div>
      </a>
    </DropdownMenuItem>
  )
}

function ActiveNetworkMenuItem(props: NetworkMenuItemProps) {
  const { network } = props

  return (
    <DropdownMenuItem
      disabled
      className="flex w-full flex-row items-center justify-between rounded-sm bg-foreground/5 p-3 data-[disabled]:opacity-100"
    >
      <span className="text-sm">{network.longLabel}</span>
      <Check size={16} className="size-4 text-foreground" />
    </DropdownMenuItem>
  )
}
