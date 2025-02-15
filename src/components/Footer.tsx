"use client";
import { Container, Text, useColorModeValue, Box, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function PageFooter() {
  const bgColor = useColorModeValue("white", "black");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const highlightColor = useColorModeValue("teal.600", "green.300");


  return (
    <Box
      bg={bgColor}
      maxW="100%"
      mt={20}
      mb={10}
      textAlign="center"
      py={8}
      borderColor="gray.700"
    >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Text
            color={textColor}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="medium"
            letterSpacing="tight"
          >
            &copy; {new Date().getFullYear()} Designed & Developed by{" "}
            <Text as="span" color={highlightColor} fontWeight="semibold">
              Asim Ali Murtaza
            </Text>
          </Text>
        </motion.div>
    </Box>
  );
}