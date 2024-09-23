"use client"

import React from "react"

import {
  ErrorPageContent,
  ErrorPageProps,
} from "@/components/common/error-page-content"

export default function RootErrorPage(props: ErrorPageProps) {
  const { error, reset } = props

  return <ErrorPageContent error={error} reset={reset} />
}
