"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  HStack,
  useColorModeValue,
  Link,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { fetchHomeData } from "@/lib/firebase";
import { useEffect, useState } from "react";

// Motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

interface HomeData {
  description: string;
  image: string;
}

export default function HeroSection() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHomeData();
        setHomeData(data as HomeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  // Dynamic color values based on color mode
  const textColor = useColorModeValue("gray.900", "green.100");
  const buttonHoverColor = useColorModeValue("teal.600", "green.400");
  const borderColor = useColorModeValue("green.500", "green.300");
  const gradientText = useColorModeValue(
    "linear-gradient(90deg, teal.400, teal.200)",
    "linear-gradient(170deg, green.300, whiteAlpha.900)"
  );

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      textAlign={{ base: "center", md: "left" }}
      minH="100vh"
      px={{ base: 4, md: 5, lg: 10 }}
      py={{ base: 20, md: 20 }}
      id="home"
    >
      {/* Left Content */}
      <MotionBox
        maxW={{ base: "100%", md: "650px" }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MotionHeading
          as="h1"
          size={{ base: "2xl", md: "3xl" }} // Responsive font size
          mb={4}
          bgClip="text"
          bgGradient={gradientText}
          fontWeight="bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I am Asim Ali Murtaza
        </MotionHeading>

        <MotionText
          fontSize={{ base: "xl", md: "2xl" }} // Responsive font size
          fontWeight="bold"
          color={textColor}
          mb={4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A Passionate Developer
        </MotionText>

        <MotionText
          fontSize={{ base: "md", md: "lg" }} // Responsive font size
          mb={8}
          color="gray.500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {homeData?.description || ""}
        </MotionText>

        {/* Action Buttons */}
        <VStack spacing={4} align={{ base: "center", md: "flex-start" }}>
          <HStack spacing={4}>
            {/* Social Media Links */}
            <Link href="https://github.com/AsimAliMurtaza" target="_blank">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                borderRadius="full"
                borderWidth="1px"
                borderColor={borderColor}
                color={textColor}
                _hover={{ bg: buttonHoverColor, color: "white" }}
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaGithub />
              </MotionBox>
            </Link>
            <Link href="https://linkedin.com/in/AsimAliMurtaza" target="_blank">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                borderRadius="full"
                borderWidth="1px"
                borderColor={borderColor}
                color={textColor}
                _hover={{ bg: buttonHoverColor, color: "white" }}
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaLinkedin />
              </MotionBox>
            </Link>
            <Link href="https://x.com/heyits_asim" target="_blank">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                borderRadius="full"
                borderWidth="1px"
                borderColor={borderColor}
                color={textColor}
                _hover={{ bg: buttonHoverColor, color: "white" }}
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaTwitter />
              </MotionBox>
            </Link>
          </HStack>
        </VStack>
      </MotionBox>

      {/* Right Image */}
      <MotionBox
        mt={{ base: 10, md: 0 }}
        borderRadius="100%"
        maxH={{ base: "250px", md: "350px" }}
        maxW={{ base: "250px", md: "350px" }}
        overflow="hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Image
          src={homeData?.image || ""}
          alt="Asim Ali Murtaza"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </MotionBox>
    </Flex>
  );
}