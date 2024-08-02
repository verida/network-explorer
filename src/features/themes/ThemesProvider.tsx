"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export type ThemeProviderProps = {
  children: React.ReactNode
}

export function ThemesProvider(props: ThemeProviderProps) {
  const { children } = props

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
