import { BlockchainAnchor } from "@verida/types"
import { useQuery } from "react-query"

import { getActiveIdentitiesCount } from "@/features/identities/utils"
import { Logger } from "@/features/logger"

const logger = Logger.create("Identities")

// TODO: Replace by a server-side function when using server components
export function useActiveIdentitiesCount(
  didRegistryBlockchain: BlockchainAnchor
) {
  const { data, ...other } = useQuery(
    ["identities", didRegistryBlockchain, "activeDIDCount"],
    async () => {
      return getActiveIdentitiesCount(didRegistryBlockchain)
    },
    {
      onError: (error) => {
        logger.error(error)
      },
    }
  )

  return {
    activeIdentitiesCount: data,
    ...other,
  }
}
