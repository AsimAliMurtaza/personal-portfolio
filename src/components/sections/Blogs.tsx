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
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  author: string;
}

const MotionBox = motion(Box);

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
  const [itemsToShow, setItemsToShow] = useState(3); // Load 3 blogs initially
  const router = useRouter();

  // Define colors for light and dark modes
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const cardBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const buttonBg = useColorModeValue("teal.300", "green.200");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
        setVisibleBlogs(data.slice(0, itemsToShow)); // Initially show 3 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    const newItemsToShow = itemsToShow + 3; // Load 3 more blogs
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <GridItem>
              <MotionBox
                p={2}
                borderRadius="20px"
                boxShadow="md"
                bg={cardBg}
                minH="250px"
                maxW="350px"
                mx="auto"
                overflow="hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  borderRadius="xl"
                  objectFit="cover"
                  width="100%"
                  height="160px"
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
                  <Text fontSize="xs" color={textColor}>
                    {blog.publishedAt.split("T")[0]}
                  </Text>
                </VStack>
              </MotionBox>
              <Flex justify="center" mt={4}>
                <Link href={`/blogs/${blog.id}`} passHref>
                  <Button
                    size="sm"
                    borderRadius="10px"
                    variant="outline"
                    color={buttonBg}
                    _hover={{ bg: buttonBg, color: "black" }}
                  >
                    Read More
                  </Button>
                </Link>
              </Flex>
            </GridItem>
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
              size="sm"
              borderRadius="lg"
              px={5}
              py={2}
              fontSize="sm"
              fontWeight="medium"
              color={buttonBg}
              onClick={handleShowMore}
              _hover={{
                transform: "scale(1.05)",
                bg: buttonBg,
                color: "black",
              }}
            >
              Show More Blogs
            </Button>
          </motion.div>
        </Box>
      )}
    </Container>
  );
}
