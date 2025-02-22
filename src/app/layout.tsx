import type { Metadata } from "next";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { fonts } from "./fonts";
import { cn } from "@/lib/utils";
import ClientWrapper from "@/components/ClientWrapper"; // New wrapper

export const metadata: Metadata = {
  title: "Asim Ali Murtaza",
  description: "Asim's Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
            <ClientWrapper>{children}</ClientWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
