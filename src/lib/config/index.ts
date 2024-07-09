import { Network } from "@verida/types";
import { Client } from "@verida/client-ts";

// data source for summary of nodes
const nodeSummaryUrl = process.env.NEXT_PUBLIC_NODE_SUMMARY_URL;

const veridaEnv: Network = Network.BANKSIA;

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
  },
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://develop.d1lkxmbu5ufoio.amplifyapp.com/";

export const config = {
  veridaEnv,
  walletProviderApiBaseUrl,
  features,
  isMockDataEnabled,
  client,
  nodeSummaryUrl,
  baseUrl
};
