"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import * as React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"

const queryClient = new QueryClient()

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>{children}</RecoilRoot>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}
