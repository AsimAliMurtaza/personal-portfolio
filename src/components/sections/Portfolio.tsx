"use client";

import {
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
  Box,
  Button,
  useColorModeValue,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  projectNo: number;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink?: string;
}

const MotionBox = motion(Box);

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [itemsToShow, setItemsToShow] = useState(4); // Projects per load

  // Define colors for light and dark modes
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const cardBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const buttonBg = useColorModeValue("teal.300", "green.200");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(db, "portfolio-projects");
        const querySnapshot = await getDocs(projectCollection);
  
        const fetchedProjects: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProjects.push({
            id: doc.id,
            projectNo: data.projectNo,
            title: data.title,
            description: data.description,
            image: data.image,
            githubLink: data.githubLink,
            liveLink: data.liveLink,
          });
        });
  
        // Sort projects by projectNo in ascending order
        fetchedProjects.sort((a, b) => a.projectNo - b.projectNo);
  
        setProjects(fetchedProjects);
        setVisibleProjects(fetchedProjects.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchProjects();
  }, []);
  

  const handleShowMore = () => {
    const newItemsToShow = itemsToShow + 4; // Load 4 more items
    setItemsToShow(newItemsToShow);
    setVisibleProjects(projects.slice(0, newItemsToShow));
  };

  return (
    <Container
      maxW="100%"
      mx="auto"
      id="portfolio"
      my={{ base: "100px", md: "80px" }}
      p={8}
      textAlign="center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading
          as="h1"
          color={headingColor}
          mb={10}
          fontSize="4xl"
          fontWeight="semibold"
          letterSpacing="wide"
        >
          PORTFOLIO
        </Heading>
      </motion.div>

      <Grid
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <GridItem>
                <MotionBox
                  p={2}
                  borderRadius="20px"
                  boxShadow="md"
                  bg={cardBg}
                  minH="280px" // Ensuring all cards have equal height
                  maxW="320px" // Smaller width for compact design
                  mx="auto" // Center align for consistency
                  overflow="hidden"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    borderRadius="xl"
                    objectFit="cover"
                    width="100%"
                    height="140px"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.02)" }}
                  />
                  <VStack spacing={3} mt={2} align="stretch">
                    <Heading
                      as="h3"
                      size="sm"
                      color={headingColor}
                      fontWeight="semibold"
                      textAlign="center"
                    >
                      {project.title}
                    </Heading>
                    <Text
                      fontSize="sm"
                      textAlign="center"
                      color={textColor}
                      px={2}
                      noOfLines={3}
                    >
                      {project.description}
                    </Text>
                  </VStack>
                </MotionBox>
                <Flex justify="center" mb={6} mt={4}>
                  <Link href={project.githubLink} target="_blank">
                    <Button
                      size="sm"
                      borderRadius="10px"
                      color={buttonBg}
                      variant="ghost"
                      _hover={{ bg: buttonBg, color: "black" }}
                    >
                      GitHub
                    </Button>
                  </Link>
                  {project.liveLink && (
                    <Link href={project.liveLink} target="_blank">
                      <Button
                        size="sm"
                        ml={2}
                        borderRadius="full"
                        color={buttonBg}
                        variant="ghost"
                        _hover={{ bg: buttonBg, color: "black" }}
                      >
                        Live Demo
                      </Button>
                    </Link>
                  )}
                </Flex>
              </GridItem>
            </motion.div>
          </motion.div>
        ))}
      </Grid>

      {/* Show More Button */}
      {itemsToShow < projects.length && (
        <Box textAlign="center" mt={8}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="sm"
              borderRadius="lg"
              px={5}
              py={2}
              fontSize="sm"
              fontWeight="medium"
              color={buttonBg}
              _hover={{
                transform: "scale(1.05)",
                bg: buttonBg,
                color: "black",
              }}
              onClick={handleShowMore}
            >
              Show More Projects
            </Button>
          </motion.div>
        </Box>
      )}
    </Container>
  );
}
