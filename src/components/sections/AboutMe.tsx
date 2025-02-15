"use client";

import { motion } from "framer-motion";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Divider,
  Badge,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserTie,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRef } from "react";
import useInView from "@/lib/useInView";
import { fetchAboutMeData } from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";

interface AboutMeData extends DocumentData {
  description: string;
  phone: string;
  email: string;
  from: string;
  language: string;
  freelance: string;
  skills: { name: string; level: number }[];
}

export default function AboutMe() {
  const [aboutMeData, setAboutMeData] = useState<AboutMeData | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAboutMeData();
        setAboutMeData(data as AboutMeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  // Theme-based colors
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const cardBgColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.100");
  const borderColor = useColorModeValue("teal.300", "green.200");
  const buttonColor = useColorModeValue("teal.100", "green.500");
  const onClickHandler = () => {
    window.open(`${aboutMeData?.resume}`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.7 }}
    >
      <Container maxW="6xl" py={24} id="about">
        <Heading
          as="h1"
          color={headingColor}
          fontSize="4xl"
          fontWeight="semibold"
          letterSpacing="wide"
          textAlign="center"
          mb={10}
        >
          About Me
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          textAlign={{ base: "center", md: "left" }}
        >
          {/* Content Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "2fr 3fr" }}
            gap={{ base: 8, md: 12 }}
          >
            {/* Personal Info & Contact */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                {/* Personal Information */}
                {[
                  { label: "Phone", value: aboutMeData?.phone, icon: FaPhone },
                  {
                    label: "Email",
                    value: aboutMeData?.email,
                    icon: FaEnvelope,
                  },
                  {
                    label: "Location",
                    value: aboutMeData?.from,
                    icon: FaMapMarkerAlt,
                  },
                  {
                    label: "Languages",
                    value: aboutMeData?.language,
                    icon: FaGlobe,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <HStack
                      bg={cardBgColor}
                      p={4}
                      borderRadius="lg"
                      boxShadow="lg"
                      spacing={4}
                      borderLeft="4px solid"
                      borderColor={borderColor}
                    >
                      <Icon as={item.icon} boxSize={6} color={headingColor} />
                      <Text fontSize="lg" color={textColor} fontWeight="medium">
                        {item.value || "N/A"}
                      </Text>
                    </HStack>
                  </motion.div>
                ))}

                {/* Freelance Availability */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <HStack
                    bg={cardBgColor}
                    p={4}
                    borderRadius="lg"
                    boxShadow="lg"
                    justify="space-between"
                  >
                    <HStack>
                      <Icon as={FaUserTie} boxSize={6} color={headingColor} />
                      <Text fontSize="lg" color={textColor} fontWeight="medium">
                        Freelance Status:
                      </Text>
                    </HStack>
                    <Badge
                      colorScheme={
                        aboutMeData?.freelance === "Available" ? "green" : "red"
                      }
                      fontSize="sm"
                      p={1.5}
                      borderRadius="md"
                    >
                      {aboutMeData?.freelance || "N/A"}
                    </Badge>
                  </HStack>
                </motion.div>
              </VStack>
            </GridItem>

            {/* Description & Skills */}
            <GridItem>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="lg">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Text
                    color={textColor}
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="tall"
                    textAlign="justify"
                    fontWeight="medium"
                  >
                    {aboutMeData?.description ||
                      "Passionate developer who loves to build high-performance, user-friendly applications."}
                  </Text>
                </motion.div>

                {/* Divider */}
                <Spacer my={6} borderColor={headingColor} />
                <Button onClick={onClickHandler} size="sm" bg={buttonColor} borderRadius="10px">
                  Download CV
                </Button>
                {/* Skills Section */}
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    </motion.div>
  );
}
