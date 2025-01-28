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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import useInView from "@/lib/useInView";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink?: string;
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);

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
            title: data.title,
            description: data.description,
            image: data.image,
            githubLink: data.githubLink,
            liveLink: data.liveLink,
          });
        });

        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
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
        id="portfolio"
        my={{ base: "100px", md: "80px" }}
      >
        <Heading
          as="h2"
          color="green.400"
          mb={10}
          textAlign="center"
          fontWeight="thin"
        >
          PORTFOLIO
        </Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          }}
          gap={5}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <GridItem key={project.id}>
                  <Box
                    backgroundSize="cover"
                    display="flex"
                    minHeight="30vh"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    border="0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      borderRadius="10px"
                      objectFit="cover"
                      width="100%"
                      height="200px"
                    />
                  </Box>
                  <Heading
                    as="h3"
                    size="xl"
                    color="green.100"
                    mb={3}
                    textAlign="center"
                    fontWeight="thin"
                  >
                    {project.title}
                  </Heading>
                  <Text fontWeight="thin" textAlign="center" color="white">
                    {project.description}
                  </Text>
                  <Box textAlign="center" mt={5}>
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button colorScheme="green" variant="ghost">
                        View on GitHub
                      </Button>
                    </Link>
                  </Box>
                  {project.liveLink && (
                    <Box textAlign="center" mt={2}>
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button colorScheme="green" variant="ghost">
                          View Live Demo
                        </Button>
                      </Link>
                    </Box>
                  )}
                </GridItem>
              </motion.div>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
}
