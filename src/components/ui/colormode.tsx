"use client";

import { Button, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant={"ghost"}
      onClick={toggleColorMode}
      sx={{
        padding: "0.5rem",
        display: "flex",
        justifyItems: "left",
      }}
    >
      {colorMode === "light" ? <FaMoon /> : <FaSun />}
    </Button>
  );
}
