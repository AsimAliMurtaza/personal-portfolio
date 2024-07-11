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

// Define interfaces for data
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
    "https://www.overleaf.com/download/project/65b5d9a3e349d90293f8624d/build/190a1ba2cd2-4a538ffe5a43d11d/output/output.pdf?compileGroup=standard&clsiserverid=clsi-pre-emp-n2d-c-f-k9r9&enable_pdf_caching=true&popupDownload=true"
  );
};

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {rootMargin: "-200px"});

  const [aboutMeData, setAboutMeData] = useState<AboutMeData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAboutMeData(); // Assuming fetchAboutMeData is implemented to fetch data from Firestore
        console.log("Fetched data:", data); // Log fetched data
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
     <Container maxW="container.xl" mx="auto" id="about" my={{ base: "100px", md: "150px" }}>
        <Heading
          as="h2"
          textAlign="center"
          mb={10}
          fontWeight="thin"
          color="green.400"
        >
          ABOUT ME
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={10} alignItems="center">
          <GridItem>
            <Card
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg="rgba(0, 0, 0, 0.2)" // Adjusted background color
            >
              <Image
                src={aboutMeData?.image}
                alt="profile"
                boxSize={{ base: "200px", md: "300px" }} // Adjusted image size for responsiveness
                objectFit="cover"
                borderRadius="full"
                mt={5}
              />
            </Card>
          </GridItem>
          <GridItem>
            <Box>
              <Text color="white" textAlign={{ base: "center", md: "left" }} mb={5}>
                {aboutMeData?.description || "Description"}
              </Text>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Text color="green.100" fontWeight="bold">
                    Birthday:
                  </Text>
                  <Text color="white">{aboutMeData?.birthday}</Text>
                </HStack>
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
              <Button colorScheme="green" mt={5} onClick={onClickHandler}>
                Download Resume
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </motion.div>
  );
}
