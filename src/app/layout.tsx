import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/providers";
import Navbar from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: {
    default: "Verida Network Explorer",
    template: "%s | Verida Network Explorer",
  },
  description: "Verida - Enhancing the way you interact with the blockchain.",
  applicationName: "Verida",
  keywords: ["Verida"],
  metadataBase: new URL("https://verida-explorer.vercel.app"),
  openGraph: {
    url: "https://verida-explorer.vercel.app",
    title: "Verida",
    description: "Verida - Enhancing the way you interact with the blockchain.",
    images: [
      {
        url: "https://verida-explorer.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: "Verida",
      },
    ],
    siteName: "Verida Network Explorer",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={sora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1 flex-row justify-center">
              <main className="w-full max-w-screen-xl px-4 pb-14 pt-4 sm:px-8 sm:pt-8">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
