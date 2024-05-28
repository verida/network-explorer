import { EnvironmentType } from "@verida/types";

const nodeEnv = process.env.NODE_ENV || "development";

const veridaEnv: EnvironmentType = <EnvironmentType>(
  process.env.REACT_APP_VERIDA_ENV
);

const veridaRpcUrl = process.env.REACT_APP_POLYGON_RPC_URL;
const veridaContextName = process.env.REACT_APP_VERIDA_CONTEXT_NAME;
const veridaVaultContextName = process.env.REACT_APP_VERIDA_VAULT_CONTEXT_NAME;
const veridaNodeSummaryUrl = process.env.REACT_APP_NODE_SUMMARY_URL;
const veridaNetworkStatusUrl = process.env.REACT_APP_NETWORK_STATUS_URL;

export const config = {
  nodeEnv,
  veridaEnv,
  veridaRpcUrl,
  veridaContextName,
  veridaVaultContextName,
  veridaNodeSummaryUrl,
  veridaNetworkStatusUrl,
};
