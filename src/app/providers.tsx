// // app/providers.tsx
// "use client";

// import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import { theme } from "@chakra-ui/react";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
// }

"use client";

import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

// Step 1: Configure the theme to support light and dark modes
const config: ThemeConfig = {
  initialColorMode: "dark", // Set default mode to "dark"
  useSystemColorMode: true, // Automatically switch based on system preferences
};

const customTheme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.900",
      },
    }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
