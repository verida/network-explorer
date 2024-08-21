"use client"

import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"
import { getRootPageRoute } from "@/features/routes/utils"

export type IdentitiesErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function IdentitiesErrorPage() {
  return (
    <ErrorPageContent
      message="Oops! Something went wrong when getting the Identities overview"
      buttonHref={getRootPageRoute()}
      buttonLabel="Return to the home page"
    />
  )
}
