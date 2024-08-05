import { BlockchainAnchor } from "@verida/types"
import { useMemo } from "react"
import { useQuery } from "react-query"

import { isValidVeridaDid } from "@/features/did/utils"
import { getIdentity } from "@/features/identities/utils.client"
import { Logger } from "@/features/logger"

const logger = Logger.create("Identities")

export function useIdentity({
  didRegistryBlockchain,
  did,
}: {
  didRegistryBlockchain: BlockchainAnchor
  did: string
}) {
  const isValid = useMemo(() => {
    return isValidVeridaDid(didRegistryBlockchain, did)
  }, [didRegistryBlockchain, did])

  const { data, ...other } = useQuery(
    ["identities", did],
    async () => getIdentity(didRegistryBlockchain, did),
    {
      enabled: isValid,
      onError: (error) => {
        logger.error(error)
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )

  return {
    identity: data,
    ...other,
  }
}
