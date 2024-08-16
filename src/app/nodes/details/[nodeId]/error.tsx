"use client"

import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"

export type NodeErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function NodeErrorPage() {
  return (
    <ErrorPageContent
      message="Oops! Something went wrong when getting the information of the node"
      buttonHref="/nodes"
      buttonLabel="Return to Nodes overview"
    />
  )
}
