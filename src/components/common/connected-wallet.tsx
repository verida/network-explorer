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

const ConnectedWallet = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FD4F64] text-white rounded-[24px] py-3 pl-4 pr-3 gap-2 h-12 w-[206px] hover:bg-[#FD4F64]">
          <div className="bg-[#37D5C7] rounded-[300px] p-1">
            <VeridaIcon />
          </div>
          <div>verida-user.VDA</div>
          <FaAngleDown />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[560px]">
        <Close className="absolute right-4 top-4 transition-opacity hover:opacity-100 rounded-[100px] h-[30px] w-[30px]">
          <X className="h-4 w-4 text-white m-auto" />
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
