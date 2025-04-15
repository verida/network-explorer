"use client"

import React from "react"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/common/error-page-content"
import { getRootPageRoute } from "@/features/routes/utils"

export default function IdentityErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      error={error}
      reset={reset}
      message={
        error instanceof Error && error.message === "Invalid DID"
          ? "The identifier (DID) you are looking for is not valid for a Verida identity"
          : "Something went wrong when getting the identity"
      }
      hideNavigationButton={
        error instanceof Error && error.message === "Invalid DID"
      }
      navigationButtonHref={getRootPageRoute()}
      navigationButtonLabel="Return to Identities overview"
    />
  )
}
