"use client"

import React from "react"

import { ErrorPageContent } from "@/components/common/error-page-content"
import { getRootPageRoute } from "@/features/routes/utils"

export type IdentityErrorPageProps = {
  error: unknown
  reset: () => void
}

export default function IdentityErrorPage(props: IdentityErrorPageProps) {
  const { error } = props

  return (
    <ErrorPageContent
      message={
        error instanceof Error && error.message === "Invalid DID"
          ? "The identifier (DID) you are looking for is not valid for a Verida identity"
          : "Oops! Something went wrong when getting the identity"
      }
      buttonHref={getRootPageRoute()}
      buttonLabel="Return to Identities overview"
    />
  )
}
