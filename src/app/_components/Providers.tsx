"use client"

import React from "react"
import { RecoilRoot } from "recoil"

import { QueriesProvider } from "@/features/queries/QueriesProvider"
import { ThemesProvider } from "@/features/themes/ThemesProvider"

export type ProvidersProps = {
  children: React.ReactNode
}

export function Providers(props: ProvidersProps) {
  const { children } = props

  return (
    <ThemesProvider>
      <QueriesProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </QueriesProvider>
    </ThemesProvider>
  )
}
