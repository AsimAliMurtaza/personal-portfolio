import type { Metadata } from "next";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { fonts } from "./fonts";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Header";
import PageFooter from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Asim Ali Murtaza",
  description: "Asim&apos;s Personal portfolio",
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
          fonts.rubik.variable,
          "antialiased bg-white dark:bg-black"
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
