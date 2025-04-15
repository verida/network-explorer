import Link from "next/link"
import React, { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { getRootPageRoute } from "@/features/routes/utils"
import { Logger } from "@/features/telemetry"
import { cn } from "@/styles/utils"

const logger = Logger.create("ErrorBoundary")

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export type ErrorPageContentProps = {
  message?: string
  resetButtonLabel?: string
  hideResetButton?: boolean
  navigationButtonLabel?: string
  navigationButtonHref?: string
  hideNavigationButton?: boolean
} & ErrorPageProps &
  Omit<React.ComponentProps<"div">, "children">

export function ErrorPageContent(props: ErrorPageContentProps) {
  const {
    error,
    reset,
    message = "Something went wrong!",
    resetButtonLabel = "Try again",
    hideResetButton = false,
    navigationButtonLabel = "Go to Home page",
    navigationButtonHref = getRootPageRoute(),
    hideNavigationButton = false,
    className,
    ...divProps
  } = props

  useEffect(() => {
    logger.error(error)
  }, [error])

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
        <div className="flex flex-row items-center gap-4">
          {!hideResetButton ? (
            <Button variant="outline" onClick={reset} className="w-fit">
              {resetButtonLabel}
            </Button>
          ) : null}
          {!hideNavigationButton ? (
            <Button variant="outline" asChild className="w-fit">
              <Link href={navigationButtonHref}>{navigationButtonLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
