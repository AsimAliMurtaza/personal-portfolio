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
  Progress, // Import Progress component for skills animation
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

// --- Animation Variants (Consistent with other components) ---

// Simple fadeIn variant for general use (if not already in lib/motion.ts)
const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

// Stagger container for individual items within a list
const staggerContainer = (staggerDelay: number, initialDelay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// --- Interface Definitions (UNCHANGED) ---

interface AboutMeData extends DocumentData {
  description: string;
  phone: string;
  email: string;
  from: string;
  language: string;
  freelance: string;
  // Ensure 'resume' field is also included in the interface if it's coming from Firebase
  resume?: string; // Optional because it might not always be there
  skills: { name: string; level: number }[];
}

const MotionHStack = motion(HStack); // Keep MotionHStack if you want to use it for internal animations like whileHover

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
        // Fallback or dummy data in case of fetch error
        setAboutMeData({
          description:
            "A passionate full-stack developer with a keen eye for detail and a love for creating engaging, performant web applications. I thrive on solving complex problems and continuously learning new technologies to deliver exceptional user experiences.",
          phone: "+92 3XX XXXXXXX",
          email: "your.email@example.com",
          from: "Chichawatni, Pakistan",
          language: "English, Urdu",
          freelance: "Available",
          resume: "https://example.com/your-resume.pdf", // Dummy resume link
          skills: [
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "Node.js", level: 80 },
            { name: "MongoDB", level: 75 },
            { name: "TypeScript", level: 70 },
            { name: "Chakra UI", level: 95 },
            { name: "Framer Motion", level: 85 },
          ],
        });
      }
    };
    getData();
  }, []);

  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const cardBgColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.100");
  const borderColor = useColorModeValue("teal.300", "green.200");
  const buttonBgColor = useColorModeValue("teal.300", "green.200"); // Renamed for clarity
  const progressColor = useColorModeValue("teal", "green"); // Color scheme for progress bar

  const onClickHandler = () => {
    if (aboutMeData?.resume) {
      window.open(aboutMeData.resume, "_blank");
    } else {
      console.warn("Resume URL not available.");
      // Optionally provide a user-friendly message or fallback
      alert("Resume is not available at the moment.");
    }
  };

  return (
    // Outer motion.div controls the entire section's visibility and initial animation
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of section is in view
    >
      <Container maxW="6xl" py={24} id="about">
        {/* Main "About Me" Heading Animation */}
        <motion.div variants={fadeIn("up", "spring", 0, 0.7)}>
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
        </motion.div>

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
              {/* Container for personal info items with staggering */}
              <motion.div
                variants={staggerContainer(0.15, 0.2)} // Stagger children with a small delay
                initial="hidden"
                animate={isInView ? "show" : "hidden"} // Animate when the section is in view
                viewport={{ once: true, amount: 0.2 }}
              >
                <VStack spacing={4} align="stretch">
                  {/* Personal Information items */}
                  {[
                    {
                      label: "Phone",
                      value: aboutMeData?.phone,
                      icon: FaPhone,
                    },
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
                    // Each individual info item's animation
                    <motion.div
                      key={index}
                      variants={fadeIn("right", "spring", 0, 0.6)} // Slide in from right
                    >
                      <MotionHStack
                        bg={cardBgColor}
                        p={4}
                        borderRadius="lg"
                        boxShadow="lg"
                        spacing={4}
                        borderLeft="4px solid"
                        borderColor={borderColor}
                        // Remove initial/whileInView from MotionHStack, let parent motion.div handle it
                      >
                        <Icon as={item.icon} boxSize={6} color={headingColor} />
                        <Text
                          fontSize="lg"
                          color={textColor}
                          fontWeight="medium"
                        >
                          {item.value || "N/A"}
                        </Text>
                      </MotionHStack>
                    </motion.div>
                  ))}

                  {/* Freelance Availability Animation */}
                  <motion.div variants={fadeIn("right", "spring", 0, 0.6)}>
                    <HStack
                      bg={cardBgColor}
                      p={4}
                      borderRadius="lg"
                      boxShadow="lg"
                      justify="space-between"
                      borderLeft="4px solid" // Added consistent borderLeft
                      borderColor={borderColor}
                    >
                      <HStack>
                        <Icon as={FaUserTie} boxSize={6} color={headingColor} />
                        <Text
                          fontSize="lg"
                          color={textColor}
                          fontWeight="medium"
                        >
                          Freelance Status:
                        </Text>
                      </HStack>
                      <Badge
                        colorScheme={
                          aboutMeData?.freelance === "Available"
                            ? "green"
                            : "red"
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
              </motion.div>
            </GridItem>

            {/* Description & Skills */}
            <GridItem>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="lg">
                {/* Description Animation */}
                <motion.div
                  variants={fadeIn("up", "spring", 0.1, 1)} // Slightly delayed fade in
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Text
                    color={textColor}
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="tall"
                    textAlign="justify"
                    fontWeight="medium"
                    mb={6} // Added margin bottom for spacing
                  >
                    {aboutMeData?.description ||
                      "Passionate developer who loves to build high-performance, user-friendly applications."}
                  </Text>
                </motion.div>

                {/* "Download CV" Button Animation */}
                <motion.div
                  variants={fadeIn("up", "spring", 0.3, 1)} // More delayed fade in
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Button
                    onClick={onClickHandler}
                    size="md" // Slightly larger button
                    bg={buttonBgColor}
                    borderRadius="10px"
                    color={useColorModeValue("white", "black")} // Ensure text color contrasts
                    _hover={{
                      transform: "scale(1.05)",
                      bg: useColorModeValue("teal.400", "green.300"), // Hover state background
                    }}
                    mb={8} // Margin below the button
                  >
                    Download CV
                  </Button>
                </motion.div>

                {/* <Divider my={6} borderColor={headingColor} /> */}

                {/* Skills Section Title */}
                {/* <motion.div
                  variants={fadeIn("up", "spring", 0.5, 1)} // Even more delayed fade in
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Heading
                    as="h3"
                    size="lg"
                    color={headingColor}
                    mb={4}
                    textAlign={{ base: "center", md: "left" }}
                  >
                    My Skills
                  </Heading>
                </motion.div> */}

                {/* Skills List with Staggering
                <motion.div
                  variants={staggerContainer(0.1, 0.6)} // Stagger skills with a small delay and initial delay
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <VStack spacing={4} align="stretch">
                    {aboutMeData?.skills && aboutMeData.skills.length > 0 ? (
                      aboutMeData.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          variants={fadeIn("up", "spring", 0, 0.5)}
                        >
                          <Box>
                            <HStack justify="space-between" mb={1}>
                              <Text color={textColor} fontWeight="medium">
                                {skill.name}
                              </Text>
                              <Text color={textColor} fontSize="sm">
                                {skill.level}%
                              </Text>
                            </HStack>
                            <Progress
                              value={skill.level}
                              size="sm"
                              colorScheme={progressColor}
                              borderRadius="md"
                              hasStripe
                              isAnimated
                            />
                          </Box>
                        </motion.div>
                      ))
                    ) : (
                      <Text color={textColor}>No skills data available.</Text>
                    )}
                  </VStack>
                </motion.div> */}
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    </motion.div>
  );
}
