import { Network } from "@verida/types"
import { NETWORK_DEFINITIONS } from "@verida/vda-common"

import { NetworkDef } from "@/features/networks/types"

const myrtleDefinition = NETWORK_DEFINITIONS[Network.MYRTLE]
const banksiaDefinition = NETWORK_DEFINITIONS[Network.BANKSIA]

export const NETWORKS: Record<Network.MYRTLE | Network.BANKSIA, NetworkDef> = {
  [Network.MYRTLE]: {
    ...myrtleDefinition,
    longLabel: `${myrtleDefinition.label} mainnet`,
    explorerUrl: "https://explorer.verida.network",
  },
  [Network.BANKSIA]: {
    ...banksiaDefinition,
    longLabel: `${banksiaDefinition.label} testnet`,
    explorerUrl: "https://banksia.explorer.verida.network",
  },
}
