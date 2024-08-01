import { BlockchainAnchor } from "@verida/types"
import { activeDIDCount } from "@verida/vda-did-resolver"
import { useQuery } from "react-query"

// TODO: Replace by a server-side function when using server components
export function useActiveIdentitiesCount(
  didRegistryBlockchain: BlockchainAnchor
) {
  const { data, ...other } = useQuery(
    ["identities", didRegistryBlockchain, "activeDIDCount"],
    async () => {
      // TODO: Replace by a fetch of https://data.verida.network/network/{blockchain}/stats ?
      const result = await activeDIDCount(didRegistryBlockchain)
      if (result === undefined || result === null) {
        throw new Error("Failed to fetch active identities count")
      }

      return result
    }
  )

  return {
    activeIdentitiesCount: data,
    ...other,
  }
}
