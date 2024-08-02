import NextPlausibleProvider from "next-plausible"
import React from "react"

import { clientEnvVars } from "@/config/client"

export function PlausibleScript() {
  return (
    <NextPlausibleProvider
      domain={clientEnvVars.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
    />
  )
}
