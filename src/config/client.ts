import { ClientEnvVarsSchema } from "./schema"

const clientEnvVarsCheckResult = ClientEnvVarsSchema.safeParse({
  // Have to pass the variables one-by-one on the client because they are set
  // and replaced at build time only if they are explicitly used somewhere in the code (like here)
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_VERIDA_NETWORK: process.env.NEXT_PUBLIC_VERIDA_NETWORK,
  NEXT_PUBLIC_VERIDA_RPC_URL: process.env.NEXT_PUBLIC_VERIDA_RPC_URL,
  NEXT_PUBLIC_METRICS_BASE_URL: process.env.NEXT_PUBLIC_METRICS_BASE_URL,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
})

if (!clientEnvVarsCheckResult.success) {
  // eslint-disable-next-line no-console
  console.warn("Client environment variables errors")
  clientEnvVarsCheckResult.error.errors.forEach((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
  })

  throw new Error("Client environment variables errors")
}

/**
 * Environment variables for the client.
 *
 * Also available on the server.
 */
export const clientEnvVars = clientEnvVarsCheckResult.data
