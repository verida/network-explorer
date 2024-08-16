import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"
import { getNodesPageRoute } from "@/features/routes/utils"

export default function NodeNotFoundPage() {
  return (
    <ErrorPageContent
      message="This node was not found"
      buttonHref={getNodesPageRoute()}
      buttonLabel="Return to Nodes overview"
    />
  )
}
