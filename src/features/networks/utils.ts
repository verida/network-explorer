import { clientEnvVars } from "@/config/client"
import { NETWORKS } from "@/features/networks/constants"

export function getCurrentNetwork() {
  return NETWORKS[clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK]
}
