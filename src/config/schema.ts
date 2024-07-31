import { Network } from "@verida/types";

import { z } from "zod";

export const ClientEnvVarsSchema = z
  .object({
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_VERIDA_NETWORK: z
      .enum(["myrtle", "banksia"])
      .default("myrtle")
      .transform((value) => {
        return value === "myrtle" ? Network.MYRTLE : Network.BANKSIA;
      }),
    NEXT_PUBLIC_VERIDA_RPC_URL: z.string().url().optional(),
    NEXT_PUBLIC_METRICS_BASE_URL: z.string().url(),
    NEXT_PUBLIC_LOG_LEVEL: z
      .enum(["error", "warn", "info", "debug"])
      .default("info"),
  })
  .passthrough();

export const ServerEnvVarsSchema = ClientEnvVarsSchema.extend({
  // TODO: Add server specific env vars
}).passthrough();
