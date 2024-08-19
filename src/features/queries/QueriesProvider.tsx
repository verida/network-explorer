"use client"

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import React from "react"

import { Logger } from "@/features/logger"

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const logCategory =
        query.meta?.logCategory === "string"
          ? query.meta?.logCategory
          : "Queries"
      const logger = Logger.create(logCategory)
      logger.error(error)
    },
  }),
})

export type QueriesProviderProps = {
  children: React.ReactNode
}

export function QueriesProvider(props: QueriesProviderProps) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
