import { Network } from "@verida/types";
import { Client } from "@verida/client-ts";
import { LogLevel } from "@/features/logger";

const logLevel: LogLevel = process.env.NEXT_PUBLIC_LOG_LEVEL === 'error' ? 'error' : process.env.NEXT_PUBLIC_LOG_LEVEL === 'warn' ? 'warn' : process.env.NEXT_PUBLIC_LOG_LEVEL === 'debug' ? 'debug' : 'info';

// data source for summary of nodes
const nodeSummaryUrl = process.env.NEXT_PUBLIC_NODE_SUMMARY_URL;

const veridaEnv: Network = Network.MYRTLE;

// API
const walletProviderApiBaseUrl =
  process.env.NEXT_PUBLIC_WALLET_PROVIDER_API_BASE_URL;

// Feature flags variables
const isDevFeaturesEnabled =
  process.env.NEXT_PUBLIC_ENABLE_DEV_FEATURES === "true";

const features = {
  // This object allows a management per feature
  // Add dedicated feature env var if needed
  isVeridaConnectEnabled: isDevFeaturesEnabled,
};

const isMockDataEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === "true";

const client = new Client({
  network: veridaEnv,
  didClientConfig: {
    network: veridaEnv,
    rpcUrl: process.env.NEXT_PUBLIC_VERIDA_RPC_URL,
  },
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://develop.d1lkxmbu5ufoio.amplifyapp.com/";

export const config = {
  log: {
    level: logLevel,
  },
  veridaEnv,
  walletProviderApiBaseUrl,
  features,
  isMockDataEnabled,
  client,
  nodeSummaryUrl,
  baseUrl,
};
