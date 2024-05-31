import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QrIcon from "@/assets/svg/qrcode.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Close } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import VeridaIcon from "@/assets/svg/verida-icon.svg";

const ConnectWalletButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:rounded-lg rounded-sm md:px-6 px-4 md:py-[14px] py-2.5 leading-5 font-semibold text-[14px] ">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px] bg-cover max-w-screen bg-[url('/mobile-qr-background.jpg')] md:bg-[url('/qr-background.png')] h-screen md:h-[483px] [box-shadow:0px_4px_40px_0px_#1111111A] flex items-center justify-between rounded-sm md:px-20">
        <Close className="absolute z-50 top-8 right-6 md:right-4 md:top-4 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-[#E0E3EA] opacity-50 rounded-[100px] h-[30px] w-[30px]">
          <X className="h-4 w-4 text-[#041133] m-auto" />
        </Close>
        <div className="md:hidden flex flex-col gap-5 items-center">
          <div className="font-bold text-[28px] leading-[36px] text-[#111111]">
            Connect now
          </div>
          <div className="text-[#111111CC] font-normal text-[16px]">
            Use the button below to connect with Verida Wallet app to login or
            sign up
          </div>
          <Button className="flex items-center gap-3 bg-[#111111] text-white leading-[24px] font-medium text-[16px] py-5 px-6 sm:py-6 sm:px-12">
            <VeridaIcon />
            <div>Open in Verida Wallet</div>
          </Button>
        </div>
        <div className="md:flex hidden flex-col max-w-[353px]">
          <div className="font-bold text-[32px] leading-[40px] tracking-[-3%] text-[#111111]">
            Scan this QR code on your mobile phone to login or signup
          </div>
          <div className="text-[#111111B2] font-medium text-[16px] leading-[30px] tracking-[0.2px]">
            Already on your phone with Verida Wallet installed?{" "}
            <span className="text-[#423BCE] font-medium text-[16px] leading-[30px] tracking-[0.2px] underline">
              Log in with Verida Wallet
            </span>
          </div>
          <div className="flex gap-2 items-center mt-6">
            <Checkbox className="bg-white rounded border-[#E0E3EA] border text-[#423BCE]" />
            <div className="text-[#111111B2] tracking-[0.2px] text-[14px] font-normal leading-[26px] ">
              Remember my login
            </div>
          </div>
        </div>
        <QrIcon className="[box-shadow:0px_4.78px_28.7px_0px_#1111111F] scale-150 mr-8 md:block hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletButton;
