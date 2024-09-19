import NextPlausibleProvider from "next-plausible"
import React from "react"

import { clientEnvVars } from "@/config/client"

export function PlausibleScript() {
  if (!clientEnvVars.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    return null
  }

  return (
    <NextPlausibleProvider
      domain={clientEnvVars.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
    />
  )
}
