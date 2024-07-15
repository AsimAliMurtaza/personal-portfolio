"use client";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  Progress,
  Icon,
} from "@chakra-ui/react";
import { useRef } from "react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FaHtml5,
  FaCss3,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaGit,
} from "react-icons/fa";

interface Skill {
  id: string;
  skill: string;
  value: number;
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-200px" });

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const querySnapshot = await getDocs(skillsCollection);

        const fetchedSkills: Skill[] = [];
        querySnapshot.forEach((doc) => {
          fetchedSkills.push({
            id: doc.id,
            skill: doc.data().skill,
            value: doc.data().value,
          });
        });

        setSkills(fetchedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
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
        my={{ base: "100px", md: "80px" }}
      >
        <Heading
          as="h2"
          color={"green.400"}
          size="lg"
          mb={10}
          textAlign="center"
          fontWeight="thin"
        >
          SKILLS
        </Heading>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
            <GridItem>
              <Text fontSize="xl" fontWeight="bold" mb={4} color={"green.100"}>
                All the skills that I have in the field of work are mentioned.
              </Text>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  gap={8}
                  justifyContent="center"
                >
                  <GridItem>
                    <VStack spacing={4} align="center">
                      <Box>
                        <Icon as={FaNodeJs} boxSize={32} color="green.100" />
                      </Box>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack spacing={4} align="center">
                      <Box>
                        <Icon as={FaReact} boxSize={32} color="green.100" />
                      </Box>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack spacing={4} align="center">
                      <Box>
                        <Icon as={FaPython} boxSize={32} color="green.100" />
                      </Box>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack spacing={4} align="center">
                      <Box>
                        <Icon as={FaHtml5} boxSize={32} color="green.100" />
                      </Box>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack spacing={4} align="center">
                      <Box>
                        <Icon as={FaCss3} boxSize={32} color="green.100" />
                      </Box>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack spacing={4} align="center">
                      <Box>
                        <Icon as={FaGit} boxSize={32} color="green.100" />
                      </Box>
                    </VStack>
                  </GridItem>
                </Grid>
              </motion.div>
            </GridItem>
            <GridItem>
              <VStack spacing={6} align="start">
                {skills.map((skill) => (
                  <Box key={skill.id} width="100%">
                    <Text color="green.100">{skill.skill}</Text>
                    <Progress
                      colorScheme="green"
                      size="sm"
                      value={skill.value}
                    />
                  </Box>
                ))}
              </VStack>
            </GridItem>
          </Grid>
        </motion.div>
      </Container>
    </motion.div>
  );
}
