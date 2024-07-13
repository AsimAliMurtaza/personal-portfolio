"use client";
import { motion } from "framer-motion";
import {
  Container,
  Box,
  Heading,
  Text,
  Card,
  Image,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import useInView from "@/lib/useInView";
import { fetchAboutMeData } from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";

interface AboutMeData extends DocumentData {
  description: string;
  image: string;
  birthday: string;
  phone: string;
  email: string;
  from: string;
  language: string;
  freelance: string;
}

const onClickHandler = () => {
  window.open(
    "https://drive.google.com/file/d/1hfAwa3--ywJgBOLiyqoXKMZRx_dwnJOW/view?usp=sharing"
  );
};

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-200px" });

  const [aboutMeData, setAboutMeData] = useState<AboutMeData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAboutMeData();
        console.log("Fetched data:", data);
        setAboutMeData(data as AboutMeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.7 }}
    >
      <Container
        maxW="container.xl"
        mx="auto"
        id="about"
        my={{ base: "100px", md: "80px" }}
      >
        <Heading
          as="h2"
          textAlign="center"
          mb={10}
          fontWeight="thin"
          color="green.400"
        >
          ABOUT ME
        </Heading>

          <Grid
            templateColumns={{ base: "1fr", md: "1fr 2fr" }}
            gap={10}
            alignItems="center"
          >
            <GridItem>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
                transition={{ duration: 0.7,
                  delay: 0.3
                 }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bg="rgba(0, 0, 0, 0)"
                >
                  <Image
                    src={aboutMeData?.image}
                    alt="profile"
                    boxSize={{ base: "200px", md: "300px" }}
                    objectFit="cover"
                    borderRadius="full"
                    mt={5}
                  />
                </Box>
              </motion.div>
            </GridItem>
            <GridItem>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Box>
                  <Text
                    color="white"
                    textAlign={{ base: "center", md: "left" }}
                    mb={5}
                  >
                    {aboutMeData?.description || "Description"}
                  </Text>
                  <VStack align="start" spacing={2}>
                    <HStack></HStack>
                    <HStack>
                      <Text color="green.100" fontWeight="bold">
                        Phone:
                      </Text>
                      <Text color="white">{aboutMeData?.phone}</Text>
                    </HStack>
                    <HStack>
                      <Text color="green.100" fontWeight="bold">
                        Email:
                      </Text>
                      <Text color="white">{aboutMeData?.email}</Text>
                    </HStack>
                    <HStack>
                      <Text color="green.100" fontWeight="bold">
                        From:
                      </Text>
                      <Text color="white">{aboutMeData?.from}</Text>
                    </HStack>
                    <HStack>
                      <Text color="green.100" fontWeight="bold">
                        Language:
                      </Text>
                      <Text color="white">{aboutMeData?.language}</Text>
                    </HStack>
                    <HStack>
                      <Text color="green.100" fontWeight="bold">
                        Freelance:
                      </Text>
                      <Text color="white">{aboutMeData?.freelance}</Text>
                    </HStack>
                  </VStack>
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      x: isInView ? 0 : 100,
                    }}
                    transition={{ duration: 0.7 }}
                  >
                    <Button colorScheme="green" mt={5} onClick={onClickHandler}>
                      Download Resume
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </GridItem>
          </Grid>
      </Container>
    </motion.div>
  );
}
