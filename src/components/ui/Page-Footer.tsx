"use client";
import { Container, Text, useColorModeValue } from "@chakra-ui/react";

export default function PageFooter() {
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <Container bg={bgColor} maxW="100%" mt={20} mb={10} textAlign="center" py={5}>
      <footer>
        <Text color={textColor} textAlign="center" fontWeight="thin">
          &copy; {new Date().getFullYear()} Designed & Developed by Asim Ali
          Murtaza
        </Text>
      </footer>
    </Container>
  );
}
