import { EnvironmentType } from "@verida/types";
import {
  APP_TITLE,
  PROFILE_SCHEMA_URL,
  VERIDA_CONTEXT_NAME,
} from "@/lib/constants";
import { Client } from "@verida/client-ts";

// TODO: set up a pre-build script validating env variables

// Application variables
const appTitle = APP_TITLE;

// Verida variables
const veridaOneContextName = VERIDA_CONTEXT_NAME;

const veridaLogoUrl = process.env.NEXT_PUBLIC_VERIDA_APP_LOGO_URL;

const veridaEnv: EnvironmentType = EnvironmentType.MAINNET;
// process.env.NEXT_PUBLIC_VERIDA_ENV === "local"
//   ? EnvironmentType.LOCAL
//   : process.env.NEXT_PUBLIC_VERIDA_ENV === "devnet"
//     ? EnvironmentType.DEVNET
//     : process.env.NEXT_PUBLIC_VERIDA_ENV === "mainnet"
//       ? EnvironmentType.MAINNET
//       : EnvironmentType.TESTNET

// Schemas
// Set a fallback to avoid further issues.
const schemasURL = {
  profile: process.env.NEXT_PUBLIC_PROFILE_SCHEMA_URL || PROFILE_SCHEMA_URL,
};

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
  appTitle,
  veridaEnv,
  veridaOneContextName,
  veridaLogoUrl,
  schemasURL,
  walletProviderApiBaseUrl,
  features,
  isMockDataEnabled,
  client,
};
