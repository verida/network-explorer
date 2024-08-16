import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"

export default function NodeNotFoundPage() {
  return (
    <ErrorPageContent
      message="This node was not found"
      buttonHref="/nodes"
      buttonLabel="Return to Nodes overview"
    />
  )
}
