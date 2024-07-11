"use client";
import {
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import useInView from "@/lib/useInView";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {rootMargin: "-200px"});
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
      <Container maxW="container.xl" mx="auto" id="portfolio" my={{ base: "100px", md: "80px" }}>
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
            <GridItem key={project.id}>
              <Card bg="rgba(0, 0, 0, 0.2)" borderRadius="10px">
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    "&:hover img": {
                      transform: "scale(1.1)",
                      transition: "transform 0.9s ease-in-out",
                    },
                  }}
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
                <CardBody>
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
                  <Text
                    textAlign="center"
                    color="green.100"
                    mt={5}
                    fontWeight="bold"
                  >
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        _hover: {
                          color: "green.400",
                        },
                      }}
                    >
                      View on Github
                    </Link>
                  </Text>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
}
