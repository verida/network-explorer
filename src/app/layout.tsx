import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/providers";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils/utils";
import { APP_DESCRIPTION, APP_NAME, APP_TITLE } from "@/lib/constants";
import { serverEnvVars } from "@/config/server";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

// Server component so can't get the window location. Using an env var is not
// ideal but it's the best we can do.
const baseUrl = serverEnvVars.NEXT_PUBLIC_BASE_URL;

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
      url: `${baseUrl}/logo.svg`, // TODO: Update to the actual open graph image
      width: 1200,
      height: 630,
      alt: APP_NAME,
    },
    siteName: APP_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
          sora.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex flex-1 flex-row justify-center">
            <main className="w-full max-w-screen-xl px-4 pb-14 pt-10 sm:px-8">
              {children}
            </main>
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
