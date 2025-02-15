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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);

  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.900", "green.200");
  const bgColor = useColorModeValue("white", "black");
  const cardBg = useColorModeValue(
    "gray.50",
    "rgba(30, 30, 30, 0.5)"
  );
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
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.7 }}
    >
      <Container maxW="6xl" py={24} bg={bgColor} id="resume">
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
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Box
                p={6} // Padding for the card
                borderRadius="xl" // Rounded corners for the card
                boxShadow="md" // Subtle shadow for the card
              >
                <HStack align="center" mb={5}>
                  <FaGraduationCap size={28} color={headingColor} /> 
                  icon
                  <Heading
                    as="h2"
                    size="lg"
                    color={headingColor}
                    fontWeight="semibold"
                  >
                    Education
                  </Heading>
                </HStack>
                <VStack align="start" spacing={6}>
                  {education.map((edu) => (
                    <Box
                      key={edu.id}
                      pl={10} // Increased padding
                      pt={4}
                      pb={4}
                      position="relative"
                      borderRadius={"lg"} // Rounded corners
                      w={"full"}
                      _hover={{
                        transform: "translateY(-5px)",
                        transition: "all 0.3s ease",
                      }} // Hover effect
                      bg={cardBg} // Card background
                    >
                      <Box
                        position="absolute"
                        left="16px" // Adjusted position
                        top="30px"
                        boxSize={2} // Larger dot
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
                      <Text color={textColor} fontWeight="medium" fontSize="lg">
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
              <Box
                bg={bgColor} // Card background
                p={6} // Padding for the card
                borderRadius="xl" // Rounded corners for the card
                boxShadow="md" // Subtle shadow for the card
              >
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
                <VStack align="start" spacing={6}>
                  {experience.map((exp) => (
                    <Box
                      key={exp.id}
                      pl={10} // Increased padding
                      pt={4}
                      pb={4}
                      position="relative"
                      borderRadius={"lg"} // Rounded corners
                      w={"full"}
                      _hover={{
                        transform: "translateY(-5px)",
                        transition: "all 0.3s ease",
                      }} // Hover effect
                      bg={cardBg} // Card background
                    >
                      <Box
                        position="absolute"
                        left="16px" // Adjusted position
                        top="30px"
                        boxSize={2} // Larger dot
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
                      <Text color={textColor} fontWeight="medium" fontSize="lg">
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
