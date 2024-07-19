import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { VaultAccount, hasSession } from "@verida/account-web-vault";
import { config } from "@/lib/config";
import { Context, Network } from "@verida/client-ts";

const ConnectWalletButton = () => {
  const [veridaContext, setVeridaContext] = useState<Context>();
  const [walletAddress, setWalletAddress] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    // Runs after the first render() lifecycle
    // We use this to check if we are logged in

    // veridaContext is a Context object (See links below)
    if (!veridaContext) {
      // we don't have veridaContext in local state
      // Check if we have a stored session
      //  hasSession is from the package "@verida/account-web-vault"
      //  see below fod links to documentation
      // if (hasSession(config.veridaOneContextName)) {
      //   // we know we have a session already
      //   // login(); // when logged in this will just setup a Verida Context
      // }
    }
  }, []);

  const login = async () => {
    // Create a VaultAccount. This takes a VaultAccountConfig parameter.

    const account = new VaultAccount({
      request: {
        logoUrl: config.veridaLogoUrl,
      },
      environment: config.veridaEnv,
    });

    const context = await Network.connect({
      client: {
        environment: config.veridaEnv,
      },
      account: account,
      context: {
        name: config.veridaOneContextName,
      },
    });

    if (context) {
      // set the local state variable
      setVeridaContext(context);
    }
  };

  return (
    <Button
      onClick={login}
      className="rounded-sm px-4 py-2.5 text-[14px] font-semibold leading-5 md:rounded-lg md:px-6 md:py-[14px]"
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
