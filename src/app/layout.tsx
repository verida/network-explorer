import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/providers";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils/utils";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: "%s | Verida Network Explorer",
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: ["Verida"],
  metadataBase: new URL("https://verida-explorer.vercel.app"),
  openGraph: {
    url: "https://verida-explorer.vercel.app",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://verida-explorer.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    siteName: APP_NAME,
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
