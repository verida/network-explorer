"use client"

import React, { useCallback } from "react"

import CopyIcon from "@/assets/icons/copy.svg"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/styles/utils"

export type CopyToClipboardButtonProps = {
  content: string
  successMessage?: string
} & React.ComponentProps<"svg">

export function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
  const { content, successMessage, className, ...svgProps } = props

  const { toast } = useToast()

  const handleClick = useCallback(() => {
    navigator.clipboard?.writeText(content)
    if (successMessage) {
      toast({
        description: successMessage,
      })
    }
  }, [content, successMessage, toast])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-foreground/10"
      onClick={handleClick}
    >
      <CopyIcon className={cn("h-4 w-4", className)} {...svgProps} />
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  )
}
