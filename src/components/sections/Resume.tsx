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
  useColorMode,
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

export default function Resume() {
  const { colorMode } = useColorMode();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);

  const headingColor = useColorModeValue("green.500", "green.300");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const bgColor = useColorModeValue("white", "gray.900");
  const buttonColor = useColorModeValue("green.400", "green.300");

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
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.7 }}
    >
      <Container
        maxW="100%"
        mx="auto"
        id="resume"
        my={{ base: "100px", md: "80px" }}
        bg={bgColor} // Apply bgColor here
        borderRadius="md" // Add some border radius for better appearance
        p={5} // Add padding for spacing
        boxShadow="md" // Add a subtle shadow
      >
        <Heading
          as="h2"
          size="xl"
          color={headingColor}
          textAlign="center"
          mb={10}
          fontWeight="thin"
        >
          RESUME
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
          <GridItem>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Box>
                <HStack align="center" mb={5}>
                  <FaGraduationCap size={24} color={textColor} />
                  <Heading as="h2" size="lg" color={headingColor}>
                    Education
                  </Heading>
                </HStack>
                <VStack align="start" spacing={5}>
                  {education.map((edu) => (
                    <Box
                      key={edu.id}
                      borderLeft={`2px solid ${borderColor}`}
                      pl={5}
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        left="-10px"
                        top="10px"
                        boxSize={4}
                        bg="green.400"
                        borderRadius="full"
                      />
                      <Text fontWeight="bold" color="green.400" fontSize="xl">
                        {edu.degree}
                      </Text>
                      <Text color={buttonColor}>{edu.year}</Text>
                      <Text color={textColor} fontWeight="bold">
                        {edu.institution}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </motion.div>
          </GridItem>
          <GridItem>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <Box>
                <HStack align="center" mb={5}>
                  <FaBriefcase size={24} color={textColor} />
                  <Heading as="h2" size="lg" color={headingColor}>
                    Experience
                  </Heading>
                </HStack>
                <VStack align="start" spacing={5}>
                  {experience.map((exp) => (
                    <Box
                      key={exp.id}
                      borderLeft={`2px solid ${borderColor}`}
                      pl={5}
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        left="-10px"
                        top="10px"
                        boxSize={4}
                        bg="green.400"
                        borderRadius="full"
                      />
                      <Text fontWeight="bold" color="green.400" fontSize="xl">
                        {exp.position}
                      </Text>
                      <Text color={buttonColor}>{exp.year}</Text>
                      <Text color={textColor} fontWeight="bold">
                        {exp.company}
                      </Text>
                    </Box>
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
