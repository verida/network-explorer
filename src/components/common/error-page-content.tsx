import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/styles/utils"

export type ErrorPageContentProps = {
  message?: string
  buttonLabel: string
  buttonHref: string
} & Omit<React.ComponentProps<"div">, "children">

export function ErrorPageContent(props: ErrorPageContentProps) {
  const {
    buttonHref,
    buttonLabel,
    message = "Oops! Something went wrong when getting the Nodes overview",
    className,
    ...divProps
  } = props

  return (
    <div
      className={cn(
        "flex h-full flex-row items-center justify-center",
        className
      )}
      {...divProps}
    >
      <div className="flex flex-col items-center gap-8">
        <p>{message}</p>
        <Button asChild className="w-fit">
          <Link href={buttonHref}>{buttonLabel}</Link>
        </Button>
      </div>
    </div>
  )
}
