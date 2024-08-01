import { useQuery } from "react-query"

import { getDidDocument } from "@/features/did/utils"
import { Logger } from "@/features/logger"

const logger = Logger.create("DID")

export function useDidDocument(did: string) {
  // TODO: Validate the DID value

  const { data, ...other } = useQuery(
    ["identities", "didDocument", did],
    async () => {
      return await getDidDocument(did)
    },
    {
      onError: (error) => {
        logger.error(error)
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )

  return {
    didDocument: data,
    ...other,
  }
}
