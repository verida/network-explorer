"use client"

import React from "react"

import { Button } from "@/components/ui/button"

export type RootGlobalErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function RootGlobalErrorPage(props: RootGlobalErrorPageProps) {
  const { reset } = props

  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <p>Oops! Something went wrong!</p>
        <Button className="w-fit" onClick={reset}>
          Return to the home page
        </Button>
      </div>
    </div>
  )
}
