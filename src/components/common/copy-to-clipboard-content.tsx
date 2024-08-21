import React from "react"

import { CopyToClipboardButton } from "@/components/common/copy-to-clipboard-button"
import { cn } from "@/styles/utils"

export type CopyToClipboardContentProps = Pick<
  React.ComponentProps<typeof CopyToClipboardButton>,
  "content" | "successMessage"
> &
  React.ComponentProps<"span">

export function CopyToClipboardContent(props: CopyToClipboardContentProps) {
  const { content, successMessage, children, className, ...spanProps } = props

  return (
    <span
      className={cn("flex flex-row items-center gap-2 text-accent", className)}
      {...spanProps}
    >
      {children}
      <CopyToClipboardButton
        content={content}
        successMessage={successMessage}
        className="flex-shrink-0"
      />
    </span>
  )
}
