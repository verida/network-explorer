import { ChevronsUpDown } from "lucide-react"
import React from "react"

import NetworkIcon from "@/assets/icons/verida_network_white_logo.svg"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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

  return (
    <div {...divProps}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border-15">
            <div className="flex flex-row items-center gap-2">
              <NetworkIcon className="size-6" />
              {currentNetwork.label}
              <ChevronsUpDown size={14} />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          {networks.map((network) => (
            <React.Fragment key={network.id}>
              {network.id === currentNetwork.id ? (
                <ActiveNetworkMenuItem network={network} />
              ) : (
                <NetworkMenuItem network={network} />
              )}
            </React.Fragment>
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
    <DropdownMenuItem asChild inset key={network.id} className="cursor-pointer">
      <a href={network.explorerUrl} target="_blank" rel="noopener noreferrer">
        {network.longLabel}
      </a>
    </DropdownMenuItem>
  )
}

function ActiveNetworkMenuItem(props: NetworkMenuItemProps) {
  const { network } = props

  return (
    <DropdownMenuCheckboxItem
      key={network.id}
      checked
      disabled
      className="data-[disabled]:opacity-100"
    >
      <span>{network.longLabel}</span>
    </DropdownMenuCheckboxItem>
  )
}
