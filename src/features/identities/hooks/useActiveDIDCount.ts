import { Network } from "@verida/types"
import { activeDIDCount } from "@verida/vda-did-resolver"
import { useQuery } from "react-query"

import { getDidRegistryBlockchainForNetwork } from "@/features/identities/utils"

// TODO: Replace by a server-side function when using server components
export function useActiveDIDCount(network: Network) {
  const { data, isLoading, isError, ...other } = useQuery(
    ["identities", network, "activeDIDCount"],
    async () => {
      const didRegistryBlockchain = getDidRegistryBlockchainForNetwork(network)

      const result = await activeDIDCount(didRegistryBlockchain)
      if (!result) {
        throw new Error("Failed to fetch active DID count")
      }

      return result
    }
  )

  return {
    activeDIDCount: data,
    isLoading,
    isError,
    ...other,
  }
}
