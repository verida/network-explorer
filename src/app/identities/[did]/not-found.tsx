import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"

export default function IdentityNotFoundPage() {
  return (
    <ErrorPageContent
      message="This identity was not found"
      buttonHref="/"
      buttonLabel="Return to Identities overview"
    />
  )
}
