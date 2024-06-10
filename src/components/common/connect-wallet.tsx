import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QrIcon from "@/assets/svg/qrcode.svg";
import RightAngleIcon from "@/assets/svg/right-angle.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Close } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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
      if (hasSession(config.veridaOneContextName)) {
        // we know we have a session already
        // login(); // when logged in this will just setup a Verida Context
      }
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
      className="md:rounded-lg rounded-sm md:px-6 px-4 md:py-[14px] py-2.5 leading-5 font-semibold text-[14px] "
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
