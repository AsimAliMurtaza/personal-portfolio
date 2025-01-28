"use client";
import { motion } from "framer-motion";
import {
  Container,
  Box,
  Heading,
  Text,
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
  resume: string;
}

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });

  const onClickHandler = () => {
    window.open(`${aboutMeData?.resume}`);
  };

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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.7 }}
    >
      <Container
        maxW="100%"
        mx="auto"
        id="about"
        my={{ base: "50px", md: "80px" }}
        px={{ base: "20px", md: "40px" }}
      >
        <Heading
          as="h2"
          textAlign="center"
          mb={{ base: 6, md: 10 }}
          fontWeight="thin"
          color="green.400"
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          ABOUT ME
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 2fr" }}
          gap={{ base: 6, md: 10 }}
          alignItems="center"
        >
          <GridItem>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.7, delay: 0.3 }}
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
                  boxSize={{ base: "150px", md: "300px" }}
                  objectFit="cover"
                  borderRadius="full"
                  mt={{ base: 0, md: 5 }}
                />
              </Box>
            </motion.div>
          </GridItem>
          <GridItem>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Box>
                <Text
                  color="white"
                  textAlign={{ base: "center", md: "left" }}
                  mb={{ base: 4, md: 5 }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {aboutMeData?.description || "Description"}
                </Text>
                <VStack align={{ base: "center", md: "start" }} spacing={2}>
                  <HStack>
                    <Text
                      color="green.100"
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Phone:
                    </Text>
                    <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                      {aboutMeData?.phone}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text
                      color="green.100"
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Email:
                    </Text>
                    <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                      {aboutMeData?.email}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text
                      color="green.100"
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      From:
                    </Text>
                    <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                      {aboutMeData?.from}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text
                      color="green.100"
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Language:
                    </Text>
                    <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                      {aboutMeData?.language}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text
                      color="green.100"
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Freelance:
                    </Text>
                    <Text color="white" fontSize={{ base: "sm", md: "md" }}>
                      {aboutMeData?.freelance}
                    </Text>
                  </HStack>
                </VStack>
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    colorScheme="green"
                    mt={{ base: 4, md: 5 }}
                    size={{ base: "sm", md: "md" }}
                    onClick={onClickHandler}
                  >
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
