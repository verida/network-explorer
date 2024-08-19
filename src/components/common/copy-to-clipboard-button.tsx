"use client"

import React, { useCallback } from "react"

import CopyIcon from "@/assets/icons/copy.svg"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/styles/utils"

export type CopyToClipboardButtonProps = {
  content: string
  successMessage?: string
} & Omit<React.ComponentProps<typeof Button>, "children" | "onClick">

export function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
  const {
    content,
    successMessage,
    variant = "ghost",
    size = "icon",
    className,
    ...buttonProps
  } = props

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
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(className)}
      {...buttonProps}
    >
      <CopyIcon className="h-4 w-4" />
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  )
}
