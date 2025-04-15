"use client"

import React from "react"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/common/error-page-content"
import { sora } from "@/styles/font"
import { cn } from "@/styles/utils"

export default function RootGlobalErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <html>
      <body
        className={cn(
          "flex min-h-screen flex-col overscroll-none bg-background font-sans text-foreground antialiased",
          sora.variable
        )}
      >
        <ErrorPageContent error={error} reset={reset} hideNavigationButton />
      </body>
    </html>
  )
}
