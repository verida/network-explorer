"use client"

import React from "react"
import { RecoilRoot } from "recoil"

import { TooltipProvider } from "@/components/ui/tooltip"
import { QueriesProvider } from "@/features/queries/QueriesProvider"
import { ThemesProvider } from "@/features/themes/ThemesProvider"

export type ProvidersProps = {
  children: React.ReactNode
}

export function AppProviders(props: ProvidersProps) {
  const { children } = props

  return (
    <ThemesProvider>
      <QueriesProvider>
        <TooltipProvider>
          <RecoilRoot>{children}</RecoilRoot>
        </TooltipProvider>
      </QueriesProvider>
    </ThemesProvider>
  )
}
