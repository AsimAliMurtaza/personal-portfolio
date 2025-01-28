import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Page-Header";
import PageFooter from "@/components/ui/Page-Footer";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Asim's Portfolio",
  description: "My Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Navbar />
              {children}
              <Analytics />
            <PageFooter />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
