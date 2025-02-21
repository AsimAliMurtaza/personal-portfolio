"use client";

import {
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
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
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

const MotionBox = motion(Box);

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
  const [itemsToShow, setItemsToShow] = useState(3); // Blogs per load

  // Define colors for light and dark modes
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const cardBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const buttonBg = useColorModeValue("teal.300", "green.200");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const querySnapshot = await getDocs(blogCollection);

        const fetchedBlogs: Blog[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBlogs.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            image: data.image,
          });
        });

        setBlogs(fetchedBlogs);
        setVisibleBlogs(fetchedBlogs.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    const newItemsToShow = itemsToShow + 3; // Load 3 more items
    setItemsToShow(newItemsToShow);
    setVisibleBlogs(blogs.slice(0, newItemsToShow));
  };

  return (
    <Container
      maxW="100%"
      mx="auto"
      id="blogs"
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
          BLOGS
        </Heading>
      </motion.div>

      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {visibleBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
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
                  minH="300px"
                  maxW="350px"
                  mx="auto"
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
                    src={blog.image}
                    alt={blog.title}
                    borderRadius="xl"
                    objectFit="cover"
                    width="100%"
                    height="150px"
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
                      {blog.title}
                    </Heading>
                    <Text
                      fontSize="sm"
                      textAlign="center"
                      color={textColor}
                      px={2}
                      noOfLines={3}
                    >
                      {blog.description}
                    </Text>
                  </VStack>
                </MotionBox>
                <Flex justify="center" mb={6} mt={4}>
                  <Link href={`/blogs/${blog.id}`} passHref>
                    <Button
                      size="sm"
                      borderRadius="10px"
                      color={buttonBg}
                      variant="ghost"
                      _hover={{ bg: buttonBg, color: "black" }}
                    >
                      Read More
                    </Button>
                  </Link>
                </Flex>
              </GridItem>
            </motion.div>
          </motion.div>
        ))}
      </Grid>

      {/* Show More Button */}
      {itemsToShow < blogs.length && (
        <Box textAlign="center" mt={8}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              colorScheme="green"
              size="sm"
              borderRadius="lg"
              px={5}
              py={2}
              fontSize="sm"
              fontWeight="medium"
              color={buttonBg}
              variant="outline"
              _hover={{
                transform: "scale(1.05)",
                bg: buttonBg,
                color: "black",
              }}
              onClick={handleShowMore}
            >
              Show More Blogs
            </Button>
          </motion.div>
        </Box>
      )}
    </Container>
  );
}
