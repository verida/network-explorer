"use client"

import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { FaChevronLeft } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type GoBackButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "onClick"
>

export function GoBackButton(props: GoBackButtonProps) {
  const { variant = "ghost", size = "icon", className, ...buttonProps } = props

  const router = useRouter()

  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(className)}
      {...buttonProps}
    >
      <FaChevronLeft className="h-6 w-6 text-muted-foreground" />
      <span className="sr-only">Go back</span>
    </Button>
  )
}
