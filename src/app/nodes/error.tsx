"use client"

import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"

export type NodesErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function NodesErrorPage() {
  return (
    <ErrorPageContent
      message="Oops! Something went wrong when getting the Nodes overview"
      buttonHref="/"
      buttonLabel="Return to the home page"
    />
  )
}
