import { useQuery } from "react-query"

import { Logger } from "@/features/logger"
import { client as veridaClient } from "@/features/verida/client"
import { getAnyPublicProfile } from "@/features/verida/utils"

const logger = Logger.create("Identities")

export function useIdentityProfile(did: string) {
  const { data, isLoading, isError, ...other } = useQuery(
    ["identities", "profile", did],
    async () => {
      return await getAnyPublicProfile(veridaClient, did)
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!did,
      onError: (error) => {
        logger.error(error)
      },
    }
  )

  return {
    profile: data,
    isLoading,
    isError,
    ...other,
  }
}
