"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export type QueriesProviderProps = {
  children: React.ReactNode
}

export function QueriesProvider(props: QueriesProviderProps) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
