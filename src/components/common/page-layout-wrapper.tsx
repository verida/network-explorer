import React from "react"

import { CopyToClipboardContent } from "@/components/common/copy-to-clipboard-content"
import { GoBackButton } from "@/components/common/go-back-button"

export type PageLayoutWrapperProps = {
  children: React.ReactNode
  title?: string
  titleComplement?: string
  disableCopyTitleComplement?: boolean
  copyTitleComplementSuccessMessage?: React.ComponentProps<
    typeof CopyToClipboardContent
  >["successMessage"]
  hideBackButton?: boolean
}

export function PageLayoutWrapper(props: PageLayoutWrapperProps) {
  const {
    children,
    hideBackButton,
    title,
    titleComplement,
    copyTitleComplementSuccessMessage,
    disableCopyTitleComplement = false,
  } = props

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex flex-shrink-0 items-center gap-2">
          {hideBackButton ? null : <GoBackButton />}
          {title ? (
            <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          ) : null}
        </div>
        {titleComplement ? (
          <div className="min-w-0 max-w-fit rounded-sm bg-foreground/10 px-3 py-2.5 text-sm text-muted-foreground">
            {disableCopyTitleComplement ? (
              <span className="flex flex-row items-center">
                <span className="truncate">{titleComplement}</span>
              </span>
            ) : (
              <CopyToClipboardContent
                content={titleComplement}
                successMessage={copyTitleComplementSuccessMessage}
                className="-my-2.5 -mr-2.5 text-inherit"
              >
                <span className="truncate">{titleComplement}</span>
              </CopyToClipboardContent>
            )}
          </div>
        ) : null}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
