"use client"

import React from "react"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/common/error-page-content"
import { getRootPageRoute } from "@/features/routes/utils"

export default function NodesErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      error={error}
      reset={reset}
      message="Something went wrong when getting the Nodes overview"
      navigationButtonHref={getRootPageRoute()}
      navigationButtonLabel="Return to the home page"
    />
  )
}
