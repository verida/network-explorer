import { EnvironmentType } from "@verida/types";
import { Client } from "@verida/client-ts";

// data source for summary of nodes
const nodeSummaryUrl = process.env.REACT_APP_NODE_SUMMARY_URL;

const veridaLogoUrl = process.env.NEXT_PUBLIC_VERIDA_APP_LOGO_URL;

const veridaEnv: EnvironmentType = EnvironmentType.MAINNET;
// process.env.NEXT_PUBLIC_VERIDA_ENV === "local"
//   ? EnvironmentType.LOCAL
//   : process.env.NEXT_PUBLIC_VERIDA_ENV === "devnet"
//     ? EnvironmentType.DEVNET
//     : process.env.NEXT_PUBLIC_VERIDA_ENV === "mainnet"
//       ? EnvironmentType.MAINNET
//       : EnvironmentType.TESTNET

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
  environment: veridaEnv,
  didClientConfig: {
    network: veridaEnv,
  },
});

export const config = {
  veridaEnv,
  veridaLogoUrl,
  walletProviderApiBaseUrl,
  features,
  isMockDataEnabled,
  client,
  nodeSummaryUrl,
};
