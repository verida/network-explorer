import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"
import { getRootPageRoute } from "@/features/routes/utils"

export default function RootNotFoundPage() {
  return (
    <ErrorPageContent
      message="This page doesn't exist"
      buttonHref={getRootPageRoute()}
      buttonLabel="Return to the home page"
    />
  )
}
