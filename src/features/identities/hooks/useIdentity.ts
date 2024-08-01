import { useQuery } from "react-query"

import { getIdentity } from "@/features/identities/utils"
import { Logger } from "@/features/logger"

const logger = Logger.create("Identities")

export function useIdentity(did: string) {
  // TODO: Validate the DID value

  const { data, ...other } = useQuery(
    ["identities", did],
    async () => getIdentity(did),
    {
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
