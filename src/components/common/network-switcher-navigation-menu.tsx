import React from "react"
import { FaCheck } from "react-icons/fa"

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
        <p className="text-muted-foreground">Explorers</p>
        <div className="flex flex-col gap-2">
          {networks.map((network) => (
            <>
              {network.id === currentNetwork.id ? (
                <ActiveNetworkMenuItem network={network} />
              ) : (
                <NetworkMenuItem network={network} />
              )}
            </>
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
    <a
      href={network.explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm px-4 py-3 hover:bg-accent/10 focus:bg-accent/10"
    >
      <span className="text-sm">{network.longLabel}</span>
    </a>
  )
}

function ActiveNetworkMenuItem(props: NetworkMenuItemProps) {
  const { network } = props

  return (
    <div className="flex flex-row items-center justify-between rounded-sm bg-accent/10 px-4 py-3">
      <span className="text-sm">{network.longLabel}</span>
      <FaCheck size={14} className="size-4 text-accent-foreground" />
    </div>
  )
}
