import React, { useState } from "react";
// import QrCode from "@/assets/svg/qrcode.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import DefaultAvatar from "@/assets/svg/avatar.svg";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useMediaQuery } from "react-responsive";
import { getDidDocument } from "@/lib/utils/veridaUtils";
import { useQuery } from "react-query";
import QRCode from "react-qr-code";
import Loader from "../common/loader";
import { config } from "@/lib/config";
import Image from "next/image";
import { Account } from "@/types/account";

const ResultBox = ({ profile }: { profile: Account }) => {
  const { toast } = useToast();
  const [showResultJson, setShowResultJson] = useState(false);
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });

  const {
    data: resultJson,
    isLoading,
    isError,
  } = useQuery(
    ["didDocument", profile],
    async () => {
      return await getDidDocument(profile.did);
    },
    {
      onError: (error) => {
        toast({
          variant: "destructive",
          description: "Failed to fetch DID Document",
        });
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="text-[12px] font-normal leading-[18px] text-white/60">
        RESULTS:
      </div>
      <div className="result-box flex flex-col gap-6 rounded-lg border border-white/20 px-4 py-6 sm:gap-10 lg:p-9">
        <div className="flex flex-col justify-between sm:flex-row sm:gap-3">
          <div className="flex flex-col gap-4 sm:flex-row">
            {profile.avatarUri ? (
              <Image
                src={profile.avatarUri}
                alt=""
                className="mx-auto h-[88px] w-[88px] rounded-sm object-cover sm:mx-0"
                width={88}
                height={88}
              />
            ) : (
              <DefaultAvatar
                width="100%"
                height="100%"
                className="mx-auto h-[88px] w-[88px] rounded-sm object-cover sm:mx-0"
              />
            )}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:gap-3 lg:w-[619px]">
              <div className="mx-auto text-[20px] font-bold leading-[24px] sm:mx-0 sm:font-normal md:text-base">
                {profile.name}
              </div>
              <div
                className="flex h-fit flex-col items-center gap-3 sm:hidden"
                style={
                  isSmScreen
                    ? { boxShadow: "0px 4.78px 28.7px 0px #1111111F" }
                    : {}
                }
              >
                <div className="w-40 rounded-lg bg-white p-3">
                  <QRCode
                    size={160}
                    className="h-auto w-full max-w-full"
                    value={config.baseUrl + "/did/" + profile.did}
                    viewBox="0 0 160 160"
                  />
                </div>
                {/* {!showResultJson && (
                  <div className="text-[11px] font-normal leading-[16px]">
                    Scan to add contact
                  </div>
                )} */}
              </div>
              <div className="flex flex-col justify-between sm:flex-row">
                <div className="text-[14px] font-normal leading-[20px] text-white/60">
                  DID
                </div>
                <div className="flex gap-2 text-[14px] font-normal leading-[20px] text-[#8566F2]">
                  <span className="max-w-[calc(100%-1.5 rem)] truncate md:max-w-[340px] lg:max-w-max">
                    {profile.did}
                  </span>
                  <CopyIcon
                    color="#8566F2"
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(profile.did);
                      toast({
                        description: "Copied to clipboard",
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
                <div className="text-[14px] font-normal leading-[20px] text-white/60">
                  Country
                </div>
                <div className="text-[14px] font-normal leading-[20px]">
                  {profile.country}
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:pt-6">
                <div className="text-[14px] font-normal leading-[20px] text-white/60">
                  Description
                </div>
                <div className="break-words text-[14px] font-normal leading-[22.4px]">
                  {profile.description}
                </div>
              </div>
              <Button
                className="mt-6 h-[48px] w-[197px] rounded-sm border-white/40 bg-transparent px-6 py-[15px]"
                variant="outline"
                onClick={async () => {
                  setShowResultJson(!showResultJson);
                }}
              >
                {showResultJson ? "Hide" : "Show"} DID Document
              </Button>
            </div>
          </div>
          <div
            className="hidden h-fit flex-col items-center gap-3 sm:flex"
            style={{ boxShadow: "0px 4.78px 28.7px 0px #1111111F" }}
          >
            {/* <QrCode /> */}
            <div className="w-40 rounded-lg bg-white p-3">
              <QRCode
                size={160}
                className="h-auto w-full max-w-full"
                value={config.baseUrl + "/did/" + profile.did}
                viewBox="0 0 160 160"
              />
            </div>
            {/* {!showResultJson && <div>Scan to add contact</div>} */}
          </div>
        </div>
        {showResultJson &&
          (isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <>
              <Separator color="#FFFFFF26" className="hidden sm:block" />
              <pre className="whitespace-pre-wrap break-all text-[14px] font-normal leading-[22.4px]">
                {!resultJson || isError
                  ? "Unable to get did document"
                  : JSON.stringify(resultJson, null, 2)}
              </pre>
            </>
          ))}
      </div>
    </div>
  );
};

export default ResultBox;
