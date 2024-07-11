"use client";
import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchHomeData } from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

// Define interfaces for data
interface HomeData extends DocumentData {
  description: string;
  image: string;
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHomeData();
        console.log("Fetched data:", data);
        setHomeData(data as HomeData); // Asserting data type to HomeData
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -250 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
        duration: 1,
        type: "keyframes",
        stiffness: 260,
      }}
    >
      <Container maxW="container.xl" mx="auto" id="home" my={{ base: "90px", md: "80px" }}>
        <Box
          backgroundSize="cover"
          display="flex"
          minHeight="50vh"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
        >
          <Box borderRadius="full" overflow="hidden">
            <Image
              src={homeData?.image}
              alt="profile-pic"
              boxSize={{ base: "150px", md: "200px" }}
              objectFit="cover"
            />
          </Box>

          <Container maxW="container.md" textAlign="center" mt={10}>
            <Heading as="h1" size="xl">
              Hi, I am
            </Heading>
            <Heading as="h2" size="2xl" color="green.100">
              Muhammad Asim Ali Murtaza
            </Heading>
          </Container>

          <Container maxW="container.md" textAlign="center" mt={10}>
            <Text>{homeData?.description}</Text>
            <Box
              mt={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.100",
                  },
                }}
                href="https://twitter.com/heyits_asim" // Corrected Twitter link
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security best practice for external links
              >
                <Icon as={FaTwitter} />
              </ChakraLink>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.100",
                  },
                }}
                href="https://facebook.com/asim90209" // Corrected Facebook link
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security best practice for external links
              >
                <Icon as={FaFacebook} />
              </ChakraLink>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.100",
                  },
                }}
                href="https://github.com/AsimAliMurtaza"
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security best practice for external links
              >
                <Icon as={FaGithub} />
              </ChakraLink>
            </Box>
          </Container>
        </Box>
      </Container>
    </motion.div>
  );
}
