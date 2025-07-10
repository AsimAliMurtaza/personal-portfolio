"use client";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { useRef } from "react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Education {
  id: string;
  degree: string;
  year: string;
  institution: string;
}
interface Experience {
  id: string;
  position: string;
  year: string;
  company: string;
}

// Define the animation variants for individual items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Define the container variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child's animation
      delayChildren: 0.3, // Delay before the first child starts animating
    },
  },
};

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

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);

  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.900", "green.200");
  const bgColor = useColorModeValue("white", "black");
  const cardBg = useColorModeValue("gray.50", "rgba(30, 30, 30, 0.5)");
  const buttonColor = useColorModeValue("teal.600", "green.200");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const educationCollection = collection(db, "resume-education");
        const querySnapshot = await getDocs(educationCollection);

        const fetchedEducation: Education[] = [];
        querySnapshot.forEach((doc) => {
          fetchedEducation.push({
            id: doc.id,
            degree: doc.data().degree,
            year: doc.data().year,
            institution: doc.data().institution,
          });
        });

        setEducation(fetchedEducation);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const experienceCollection = collection(db, "resume-experience");
        const querySnapshot = await getDocs(experienceCollection);

        const fetchedExperience: Experience[] = [];
        querySnapshot.forEach((doc) => {
          fetchedExperience.push({
            id: doc.id,
            position: doc.data().position,
            year: doc.data().year,
            company: doc.data().company,
          });
        });

        setExperience(fetchedExperience);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };

    fetchExperience();
  }, []);

  return (
    <motion.div
      ref={ref}
      // This outer motion.div animates the entire section's entry
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      transition={{ duration: 0.7 }}
      // Use this viewport for the overall section animation
      viewport={{ once: true, amount: 0.2 }}
    >
      <Container maxW="6xl" py={24} bg={bgColor} id="resume">
        {/* Animated Section Heading */}
        <motion.div variants={fadeIn("up", "spring", 0.1, 1)}>
          <Heading
            as="h1"
            color={headingColor}
            mb={10}
            fontSize="4xl"
            fontWeight="semibold"
            letterSpacing="wide"
            textAlign="center"
          >
            RESUME
          </Heading>
        </motion.div>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            {/* Main container for Education section, controls its own entry animation and then staggers children */}
            <motion.div
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={containerVariants} // Apply container variants for staggering
              transition={{ delay: 0.3 }} // Delay the whole Education section animation slightly
              viewport={{ once: true, amount: 0.2 }} // Only animate once
            >
              <Box p={6} borderRadius="xl" boxShadow="md">
                {/* Education Subheading with animation */}
                <motion.div variants={fadeIn("right", "spring", 0, 1)}>
                  {" "}
                  {/* Animation for 'Education' heading */}
                  <HStack align="center" mb={5}>
                    <FaGraduationCap size={28} color={headingColor} />
                    <Heading
                      as="h2"
                      size="lg"
                      color={headingColor}
                      fontWeight="semibold"
                    >
                      Education
                    </Heading>
                  </HStack>
                </motion.div>
                <VStack align="start" spacing={6}>
                  {education.map((edu) => (
                    // Each individual education item is now a motion.div
                    <motion.div key={edu.id} variants={itemVariants}>
                      <Box
                        pl={10}
                        pt={4}
                        pb={4}
                        position="relative"
                        borderRadius={"lg"}
                        w={{ base: "320px", md: "450px", lg: "500px" }} // Responsive width for experience items
                        minH="150px" // Fixed min height for education items
                        display="flex" // Enable flexbox for vertical alignment
                        flexDirection="column"
                        justifyContent="center" // Center content vertically
                        _hover={{
                          transform: "translateY(-5px)",
                          transition: "all 0.3s ease",
                        }}
                        bg={cardBg}
                      >
                        <Box
                          position="absolute"
                          left="16px"
                          top="30px"
                          boxSize={2}
                          bg={headingColor}
                          borderRadius="full"
                        />
                        <Text
                          fontWeight="bold"
                          color={textColor}
                          fontSize="xl"
                          mb={2}
                        >
                          {edu.degree}
                        </Text>
                        <Text color={buttonColor} fontSize="md" mb={2}>
                          {edu.year}
                        </Text>
                        <Text
                          color={textColor}
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          {edu.institution}
                        </Text>
                      </Box>
                    </motion.div>
                  ))}
                </VStack>
              </Box>
            </motion.div>
          </GridItem>
          <GridItem>
            {/* Main container for Experience section, controls its own entry animation and then staggers children */}
            <motion.div
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={containerVariants} // Apply container variants for staggering
              transition={{ delay: 0.6 }} // Delay the whole Experience section animation more
              viewport={{ once: true, amount: 0.2 }} // Only animate once
            >
              <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="md">
                {/* Experience Subheading with animation */}
                <motion.div variants={fadeIn("right", "spring", 0, 1)}>
                  {" "}
                  {/* Animation for 'Experience' heading */}
                  <HStack align="center" mb={5}>
                    <FaBriefcase size={28} color={headingColor} />
                    <Heading
                      as="h2"
                      size="lg"
                      color={headingColor}
                      fontWeight="semibold"
                    >
                      Experience
                    </Heading>
                  </HStack>
                </motion.div>
                <VStack align="start" spacing={6}>
                  {experience.map((exp) => (
                    // Each individual experience item is now a motion.div
                    <motion.div key={exp.id} variants={itemVariants}>
                      <Box
                        pl={10}
                        pt={2}
                        pb={4}
                        position="relative"
                        borderRadius={"lg"}
                        w={{ base: "320px", md: "450px", lg: "500px" }} // Responsive width for experience items
                        minH="150px" // Fixed min height for experience items
                        display="flex" // Enable flexbox for vertical alignment
                        flexDirection="column"
                        justifyContent="center" // Center content vertically
                        _hover={{
                          transform: "translateY(-5px)",
                          transition: "all 0.3s ease",
                        }}
                        bg={cardBg}
                      >
                        <Box
                          position="absolute"
                          left="16px"
                          top="30px"
                          boxSize={2}
                          bg={headingColor}
                          borderRadius="full"
                        />
                        <Text
                          fontWeight="bold"
                          color={textColor}
                          fontSize="xl"
                          mb={2}
                        >
                          {exp.position}
                        </Text>
                        <Text color={buttonColor} fontSize="md" mb={2}>
                          {exp.year}
                        </Text>
                        <Text
                          color={textColor}
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          {exp.company}
                        </Text>
                      </Box>
                    </motion.div>
                  ))}
                </VStack>
              </Box>
            </motion.div>
          </GridItem>
        </Grid>
      </Container>
    </motion.div>
  );
}
