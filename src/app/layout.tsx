import type { Metadata } from "next"
import React from "react"

import { AppFooter } from "@/app/_components/app-footer"
import { AppHeader, AppHeaderOffset } from "@/app/_components/app-header"
import { AppProviders } from "@/app/_components/app-providers"
import { Toaster } from "@/components/ui/toaster"
import { serverEnvVars } from "@/config/server"
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/constants/app"
import { PlausibleScript } from "@/features/plausible/PlausibleScript"
import { sora } from "@/styles/font"
import { cn } from "@/styles/utils"

import "./globals.css"

// Server component so can't get the window location. Using an env var is not
// ideal but it's the best we can do.
const baseUrl = serverEnvVars.NEXT_PUBLIC_BASE_URL

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: baseUrl,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: {
      url: `${baseUrl}/network_explorer_preview.jpg`,
      width: 1200,
      height: 630,
      alt: APP_NAME,
    },
    siteName: APP_NAME,
    type: "website",
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleScript />
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col overscroll-none bg-background font-sans text-foreground antialiased",
          sora.variable
        )}
      >
        <AppProviders>
          <AppHeader
            className="fixed left-0 right-0 top-0 z-50"
            // FIXME: Some components in the pages pass over the header, check their z-index
          />
          <AppHeaderOffset />
          <div className="flex flex-1 flex-row justify-center">
            <main className="w-full max-w-screen-xl px-4 pb-14 pt-10 sm:px-8">
              {children}
            </main>
          </div>
          <AppFooter />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  )
}
