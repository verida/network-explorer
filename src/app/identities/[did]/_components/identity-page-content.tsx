"use client"

import Image from "next/image"
import React, { useMemo, useState } from "react"
import QRCode from "react-qr-code"

import DefaultAvatar from "@/assets/svg/avatar.svg"
import { CopyToClipboardContent } from "@/components/common/copy-to-clipboard-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { clientEnvVars } from "@/config/client"
import { EMPTY_VALUE_FALLBACK } from "@/constants/misc"
import { Identity } from "@/features/identities/types"
import { getIdentityPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"

const logger = Logger.create("<IdentityPageContent>")

type IdentityPageContentProps = {
  identity: Identity
}

export function IdentityPageContent(props: IdentityPageContentProps) {
  const { identity } = props
  const { did, profile, didDocument } = identity

  const [showDidDocument, setShowDidDocument] = useState(false)

  const formattedDidDocument = useMemo(() => {
    try {
      return JSON.stringify(didDocument, null, 2)
    } catch (error) {
      logger.error(error)
      return null
    }
  }, [didDocument])

  const qrCodeMessage = useMemo(() => {
    // The QR code would simply be the URL to the identity on that Network
    // Explorer application. The identity page is currently `/identities/:did`
    return `${clientEnvVars.NEXT_PUBLIC_BASE_URL}${getIdentityPageRoute({
      did,
    })}`
  }, [did])

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 sm:gap-10">
        <div className="flex flex-row gap-3">
          <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-1 sm:flex-row sm:items-start">
            <div>
              {profile?.avatarUri ? (
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
                <p className="truncate text-center text-xl font-bold leading-tight sm:text-start">
                  {profile?.name ?? EMPTY_VALUE_FALLBACK}
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
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-muted-foreground">DID</p>
                  <CopyToClipboardContent
                    content={did}
                    successMessage="Identity's DID copied!"
                    className="-my-2.5"
                  >
                    <span className="truncate">{did}</span>
                  </CopyToClipboardContent>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-muted-foreground">Country</p>
                  <p className="truncate">
                    {profile?.country ?? EMPTY_VALUE_FALLBACK}
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-muted-foreground">Description</p>
                  <p className="line-clamp-6 break-words">
                    {profile?.description ?? EMPTY_VALUE_FALLBACK}
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
                : "Unable to get DID document"}
            </pre>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
