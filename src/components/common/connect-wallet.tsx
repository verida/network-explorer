import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QrIcon from "@/assets/svg/qrcode.svg";
import RightAngleIcon from "@/assets/svg/right-angle.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Close } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const ConnectWalletButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:rounded-lg rounded-sm md:px-6 px-4 md:py-[14px] py-2.5 leading-5 font-semibold text-[14px] ">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px] max-w-[800px] bg-[url('/qr-background.png')] h-[483px] [box-shadow:0px_4px_40px_0px_#1111111A] flex items-center justify-between rounded-sm px-14">
        <Close className="absolute right-4 top-4 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-[#E0E3EA] opacity-50 rounded-[100px] h-[30px] w-[30px]">
          <X className="h-4 w-4 text-[#041133] m-auto" />
        </Close>
        <RightAngleIcon className="absolute right-0 -z-10" />
        <div className="flex flex-col max-w-[353px]">
          <div className="font-bold text-[32px] leading-[40px] tracking-[-3%] text-[#111111]">
            Scan this QR code on your mobile phone to login or signup
          </div>
          <div className="text-[#111111B2] font-medium text-[16px] leading-[30px] tracking-[0.2px]">
            Already on your phone with Verida Wallet installed?{" "}
            <span className="text-[#423BCE] font-medium text-[16px] leading-[30px] tracking-[0.2px] underline">
              Log in with Verida Wallet
            </span>
          </div>
          <div className="flex gap-1 items-center mt-6">
            <Checkbox className="bg-white rounded border-[#E0E3EA] border text-[#423BCE]" />
            <div className="text-[#111111B2] tracking-[0.2px] text-[14px] font-normal leading-[26px] ">
              Remember my login
            </div>
          </div>
        </div>
        <QrIcon className="[box-shadow:0px_4.78px_28.7px_0px_#1111111F] scale-150 mr-8" />
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletButton;
