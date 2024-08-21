"use client"

import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"
import { getNodesPageRoute } from "@/features/routes/utils"

export type NodeErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function NodeErrorPage() {
  return (
    <ErrorPageContent
      message="Oops! Something went wrong when getting the information of the node"
      buttonHref={getNodesPageRoute()}
      buttonLabel="Return to Nodes overview"
    />
  )
}
