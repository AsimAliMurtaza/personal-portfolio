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
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaReddit,
  FaDiscord,
} from "react-icons/fa";
import { fetchHomeData } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

// Motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

interface HomeData {
  description: string;
  image: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    reddit?: string;
    discord?: string;
  };
  roles: string[];
}

export default function HeroSection() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHomeData();
        setHomeData(data as HomeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
  const primaryColor = useColorModeValue("teal.300", "green.500");

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
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <MotionHeading
          as="h1"
          size={{ base: "2xl", md: "3xl" }}
          mb={4}
          bgClip="text"
          bgGradient={gradientText}
          fontWeight="bold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          Hi, I am Asim Ali Murtaza
        </MotionHeading>

        <MotionText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color={textColor}
          mb={4}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          {loading ? (
            <SkeletonText
              noOfLines={2} // 4 lines of skeleton loader
              spacing="4" // Space between each line
              skeletonHeight="16px" // Height of each line
              fadeDuration={0.8} // Smooth fade effect
              startColor="gray.700" // Darker gray for shimmer effect
              endColor="gray.500" // Lighter gray as it moves
            />
          ) : (
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              px="2"
              py="1"
              bg={primaryColor}
              color="white"
              fontWeight="bold"
            >
              <Typewriter
                words={homeData?.roles ?? ["Web Developer"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </Box>
          )}
        </MotionText>

        {/* Description with Skeleton Loader */}
        <MotionBox
          fontSize={{ base: "md", md: "lg" }}
          mb={8}
          color="gray.500"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          {loading ? (
            <SkeletonText
              noOfLines={2} // 4 lines of skeleton loader
              spacing="4" // Space between each line
              skeletonHeight="16px" // Height of each line
              fadeDuration={0.8} // Smooth fade effect
              startColor="gray.700" // Darker gray for shimmer effect
              endColor="gray.500" // Lighter gray as it moves
            />
          ) : (
            homeData?.description || ""
          )}
        </MotionBox>

        {/* Action Buttons */}
        <VStack spacing={4} align={{ base: "center", md: "flex-start" }}>
          <HStack spacing={4}>
            {/* Social Media Links */}
            {[
              { href: homeData?.socialLinks?.github, icon: FaGithub },
              {
                href: homeData?.socialLinks?.linkedin,
                icon: FaLinkedin,
              },
              { href: homeData?.socialLinks?.twitter, icon: FaTwitter },
              {
                href: homeData?.socialLinks?.reddit,
                icon: FaReddit,
              },
              {
                href: homeData?.socialLinks?.discord,
                icon: FaDiscord,
              },
            ].map((item, index) => (
              <Link key={index} href={item.href} target="_blank">
                <MotionBox
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                  <item.icon size={20} />
                </MotionBox>
              </Link>
            ))}
          </HStack>
        </VStack>
      </MotionBox>

      {/* Right Image with Smooth Loading */}
      <MotionBox
        mt={{ base: 10, md: 0 }}
        borderRadius="full"
        maxH={{ base: "250px", md: "350px" }}
        maxW={{ base: "250px", md: "350px" }}
        overflow="hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        position="relative"
      >
        {/* Skeleton Loader */}
        {loading && (
          <MotionBox
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            borderRadius="full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Skeleton
              height="100%"
              width="100%"
              borderRadius="full"
              fadeDuration={0.8} // Smooth fade effect
            />
          </MotionBox>
        )}

        {/* Image with Smooth Fade-in */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }} // Show image only after loading completes
          transition={{ duration: 2 }}
        >
          <Image
            src={homeData?.image || ""}
            alt="Asim Ali Murtaza"
            objectFit="cover"
            w="100%"
            h="100%"
            borderRadius="full"
          />
        </MotionBox>
      </MotionBox>
    </Flex>
  );
}
