import { ServerEnvVarsSchema } from "./schema";

const serverEnvVarsCheckResult = ServerEnvVarsSchema.safeParse(process.env);

if (!serverEnvVarsCheckResult.success) {
  console.warn("Server environment variables errors");
  serverEnvVarsCheckResult.error.errors.forEach((error) => {
    console.error(error);
  });

  throw new Error(`Server environment variables errors`);
}

/**
 * Environment variables only avaialble on the server.
 */
export const serverEnvVars = serverEnvVarsCheckResult.data;
