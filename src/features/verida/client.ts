import { Client } from "@verida/client-ts"

import { clientEnvVars } from "@/config/client"

export const client = new Client({
  network: clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK,
  didClientConfig: {
    network: clientEnvVars.NEXT_PUBLIC_VERIDA_NETWORK,
    rpcUrl: clientEnvVars.NEXT_PUBLIC_VERIDA_RPC_URL,
  },
})
