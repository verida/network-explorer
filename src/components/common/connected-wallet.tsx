import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import VeridaIcon from "@/assets/svg/verida.svg";
import { FaAngleDown } from "react-icons/fa6";
import { Close } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/lib/atom";
import UnAuthorizedContent from "./unauthorized-content";
import AuthorizedContent from "./authorized-content";
import ConnectedContent from "./connected-content";
import { cn } from "@/lib/utils/utils";

const ConnectedWallet = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "h-12 gap-2 rounded-[24px] py-2 pl-3 pr-3 text-foreground md:w-[206px] md:py-3 md:pl-4",
            user.connected
              ? "bg-[#FD4F64] hover:bg-[#FD4F64]"
              : "bg-white/20 hover:bg-white/10"
          )}
        >
          <VeridaIcon />
          <div className="hidden md:block">verida-user.VDA</div>
          <FaAngleDown />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[560px]">
        <Close className="absolute right-4 top-4 z-50 h-[30px] w-[30px] rounded-[100px] transition-opacity hover:opacity-100">
          <X className="m-auto h-4 w-4 text-foreground" />
        </Close>
        <DialogTitle className="text-center">Your Wallet</DialogTitle>
        {user.authorized ? (
          user.connected ? (
            <ConnectedContent />
          ) : (
            <AuthorizedContent />
          )
        ) : (
          <UnAuthorizedContent />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectedWallet;
