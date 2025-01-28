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
import { useEffect, useState, useRef } from "react";
import useInView from "@/lib/useInView";

interface HomeData extends DocumentData {
  description: string;
  image: string;
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHomeData();
        console.log("Fetched data:", data);
        setHomeData(data as HomeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <motion.div
      id="home"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{
        duration: 0.5,
      }}
    >
      <Box
        backgroundSize="cover"
        maxW="100%"
        display="flex"
        mt={20}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
          transition={{
            duration: 0.5,
          }}
        >
          <Box borderRadius="full" overflow="hidden">
            <Image
              src={homeData?.image}
              alt="profile-pic"
              boxSize={{ base: "150px", md: "200px" }}
              objectFit="cover"
            />
          </Box>
        </motion.div>

        <Container maxW="container.md" textAlign="center" mt={10}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
          >
            <Heading as="h1" size="xl">
              Hi, I am
            </Heading>

            <Heading as="h2" size="2xl" color="green.100">
              Muhammad Asim Ali Murtaza
            </Heading>
          </motion.div>
        </Container>

        <Container maxW="container.md" textAlign="center" mt={10}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
          >
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
                href="https://x.com/heyits_asim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={FaTwitter} />
              </ChakraLink>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.100",
                  },
                }}
                href="https://facebook.com/asim90209"
                target="_blank"
                rel="noopener noreferrer"
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon as={FaGithub} />
              </ChakraLink>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
}
