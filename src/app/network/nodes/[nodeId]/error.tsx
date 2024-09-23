"use client"

import React from "react"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/common/error-page-content"
import { getNodesPageRoute } from "@/features/routes/utils"

export default function NodeErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return (
    <ErrorPageContent
      error={error}
      reset={reset}
      message="Something went wrong when getting the information of the node"
      navigationButtonHref={getNodesPageRoute()}
      navigationButtonLabel="Return to Nodes overview"
    />
  )
}
