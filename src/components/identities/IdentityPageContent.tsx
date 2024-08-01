"use client"

import { DIDDocument } from "did-resolver"
import Image from "next/image"
import React, { useMemo, useState } from "react"
import QRCode from "react-qr-code"

import CopyIcon from "@/assets/icons/copy.svg"
import DefaultAvatar from "@/assets/svg/avatar.svg"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { clientEnvVars } from "@/config/client"
import { Identity } from "@/features/identities/types"
import { Logger } from "@/features/logger"

const logger = Logger.create("<ResultBox>")

type IdentityPageContentProps = {
  did: string
  profile: Identity
  didDocument: DIDDocument
}

export function IdentityPageContent(props: IdentityPageContentProps) {
  const { did, profile, didDocument } = props

  const { toast } = useToast()

  const [showDidDocument, setShowDidDocument] = useState(false)

  const formattedDidDocument = useMemo(() => {
    if (!didDocument) {
      return null
    }
    try {
      return JSON.stringify(didDocument, null, 2)
    } catch (error) {
      logger.error(error)
      return null
    }
  }, [didDocument])

  const qrCodeMessage = useMemo(() => {
    // The QR code would simply be the URL to the account on that Network
    // Explorer application. The account page is currently `/search/:did`
    return `${clientEnvVars.NEXT_PUBLIC_BASE_URL}/search/${did}`
  }, [did])

  return (
    <div className="result-box flex flex-col gap-6 rounded-lg border border-border px-4 py-6 sm:gap-10 sm:p-9">
      <div className="flex flex-row gap-3">
        <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-1 sm:flex-row sm:items-start">
          <div>
            {profile.avatarUri ? (
              <Image
                src={profile.avatarUri}
                alt=""
                className="aspect-square w-20 rounded-sm object-cover"
                width={88}
                height={88}
              />
            ) : (
              <DefaultAvatar
                width="100%"
                height="100%"
                className="aspect-square w-20 rounded-sm object-cover"
              />
            )}
          </div>
          <div className="flex w-full min-w-0 flex-col gap-9 sm:flex-1">
            <div className="flex flex-col gap-6 sm:max-w-[620px]">
              <p className="truncate text-center text-[20px] font-bold leading-[24px] sm:text-start sm:font-normal md:text-base">
                {profile.name}
              </p>
              <div className="flex flex-col items-center sm:hidden">
                <div
                  className="aspect-square w-40 rounded-lg bg-white p-3"
                  style={{ boxShadow: "0px 4.78px 28.7px 0px #1111111F" }}
                >
                  <QRCode
                    size={160}
                    className="h-full w-full"
                    value={qrCodeMessage}
                    viewBox="0 0 160 160"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[14px] font-normal leading-[20px] text-muted-foreground">
                  DID
                </div>
                <div className="flex flex-row items-center gap-2 text-[14px] font-normal leading-[20px] text-accent-foreground">
                  <span className="truncate">{profile.did}</span>
                  <CopyIcon
                    color="#8566F2"
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(profile.did)
                      toast({
                        description: "Copied to clipboard",
                      })
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[14px] font-normal leading-[20px] text-muted-foreground">
                  Country
                </p>
                <p className="truncate text-[14px] font-normal leading-[20px]">
                  {profile.country}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[14px] font-normal leading-[20px] text-muted-foreground">
                  Description
                </p>
                <p className="line-clamp-6 break-words text-[14px] font-normal leading-[22.4px]">
                  {profile.description}
                </p>
              </div>
            </div>
            <Button
              className="rounded-sm border-border-40 bg-transparent hover:bg-foreground/10 hover:text-foreground sm:w-fit"
              variant="outline"
              onClick={async () => {
                setShowDidDocument(!showDidDocument)
              }}
            >
              {showDidDocument ? "Hide" : "Show"} DID Document
            </Button>
          </div>
        </div>
        <div className="hidden sm:block">
          <div
            className="aspect-square w-40 rounded-lg bg-white p-3"
            style={{ boxShadow: "0px 4.78px 28.7px 0px #1111111F" }}
          >
            <QRCode
              size={160}
              className="h-full w-full"
              value={qrCodeMessage}
              viewBox="0 0 160 160"
            />
          </div>
        </div>
      </div>
      {showDidDocument ? (
        <>
          <Separator className="hidden sm:block" />
          <pre className="whitespace-pre-wrap break-all text-[14px] font-normal leading-[22.4px]">
            {formattedDidDocument
              ? formattedDidDocument
              : "Unable to get did document"}
          </pre>
        </>
      ) : null}
    </div>
  )
}
