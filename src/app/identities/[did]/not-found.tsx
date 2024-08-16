import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"
import { getRootPageRoute } from "@/features/routes/utils"

export default function IdentityNotFoundPage() {
  return (
    <ErrorPageContent
      message="This identity was not found"
      buttonHref={getRootPageRoute()}
      buttonLabel="Return to Identities overview"
    />
  )
}
