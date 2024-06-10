import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/providers";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/toaster";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: {
    default: "Verida",
    template: "%s | Verida",
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
    siteName: "Verida",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="min-h-screen lg:px-[92px] md:px-8 px-4 py-4 overflow-x-hidden">
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
