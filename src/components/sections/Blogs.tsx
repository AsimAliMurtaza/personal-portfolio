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

// Assuming these are from your @/lib/motion.ts file or defined locally
// If you have a shared fadeIn function in lib/motion.ts, import it.
// Otherwise, we'll define a simple one here for consistency.
const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

// Stagger container for individual blog cards
const staggerContainer = (staggerDelay: number, initialDelay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  author: string;
}

const MotionBox = motion(Box); // Keep MotionBox if you want to use it for internal animations like whileHover

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
  const [itemsToShow, setItemsToShow] = useState(3); // Load 3 blogs initially
  const router = useRouter();

  // Define colors for light and dark modes (UNCHANGED)
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const cardBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const buttonBg = useColorModeValue("teal.300", "green.200");
  const buttonColor = useColorModeValue("white", "black");
  const buttonHoverBg = useColorModeValue("teal.400", "green.300");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch from the API route (e.g., your Next.js API route)
        // Ensure this API route is correctly set up to return blog data.
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
        setVisibleBlogs(data.slice(0, itemsToShow)); // Initially show 3 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback or dummy data in case of fetch error
        setBlogs([
          {
            id: "1",
            title: "Getting Started with Next.js",
            description:
              "A beginner-friendly guide to building web applications with Next.js.",
            image: "/images/blog1.jpg",
            publishedAt: "2023-01-15T10:00:00Z",
            author: "John Doe",
          },
          {
            id: "2",
            title: "Mastering Chakra UI for React",
            description:
              "Unlock the full potential of Chakra UI for beautiful and accessible UIs.",
            image: "/images/blog2.jpg",
            publishedAt: "2023-02-20T11:30:00Z",
            author: "Jane Smith",
          },
          {
            id: "3",
            title: "Firebase for Web Development",
            description:
              "Exploring the power of Firebase for backend services in your web apps.",
            image: "/images/blog3.jpg",
            publishedAt: "2023-03-25T09:00:00Z",
            author: "Alice Johnson",
          },
          {
            id: "4",
            title: "Optimizing React Performance",
            description:
              "Tips and tricks to make your React applications faster and more efficient.",
            image: "/images/blog4.jpg",
            publishedAt: "2023-04-10T14:00:00Z",
            author: "Bob Williams",
          },
          {
            id: "5",
            title: "Understanding CSS Grid Layout",
            description:
              "A comprehensive dive into CSS Grid for responsive web design.",
            image: "/images/blog5.jpg",
            publishedAt: "2023-05-01T10:30:00Z",
            author: "Charlie Brown",
          },
        ]);
        setVisibleBlogs(blogs.slice(0, itemsToShow));
      }
    };

    fetchBlogs();
  }, [itemsToShow]); // Add itemsToShow to dependency array to re-fetch/update visibleBlogs when it changes

  const handleShowMore = () => {
    const newItemsToShow = itemsToShow + 3; // Load 3 more blogs
    setItemsToShow(newItemsToShow);
    // visibleBlogs will be updated by the useEffect when itemsToShow changes
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
      {/* Main Section Heading Animation */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
        variants={fadeIn("up", "spring", 0, 0.7)} // Animate the heading
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

      {/* Grid container for blog cards with stagger animation */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the grid is in view
        variants={staggerContainer(0.2, 0.3)} // Stagger children by 0.2s after an initial 0.3s delay
      >
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8} // Increased gap for better spacing
        >
          {visibleBlogs.map(
            (
              blog // Removed index as we're using staggerContainer
            ) => (
              <GridItem key={blog.id}>
                {/* Each blog card item */}
                <motion.div variants={fadeIn("up", "spring", 0, 0.6)}>
                  {" "}
                  {/* Use item variant */}
                  <MotionBox
                    p={2}
                    borderRadius="20px"
                    boxShadow="md"
                    bg={cardBg}
                    minH="350px" // Increased min height for more consistent card size
                    maxW="350px"
                    mx="auto"
                    overflow="hidden"
                    whileHover={{ scale: 1.05, boxShadow: "lg" }} // Enhanced hover effect
                    transition={{ duration: 0.3 }}
                    display="flex" // Enable flexbox for internal layout
                    flexDirection="column"
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      borderRadius="xl"
                      objectFit="cover"
                      width="100%"
                      height="160px"
                      mb={4} // Added margin bottom for spacing
                    />
                    <VStack spacing={2} align="stretch" flex="1" px={2} pb={2}>
                      {" "}
                      {/* Added padding */}
                      <Heading
                        as="h3"
                        size="md" // Slightly larger heading size for prominence
                        color={headingColor}
                        fontWeight="semibold"
                        textAlign="center"
                        noOfLines={2} // Limit title to 2 lines
                      >
                        {blog.title}
                      </Heading>
                      <Text fontSize="sm" color={textColor} noOfLines={3}>
                        {" "}
                        {/* Limit description to 3 lines */}
                        {blog.description}
                      </Text>
                      <Text fontSize="xs" color={textColor} mt="auto">
                        {" "}
                        {/* Pushed to bottom */}
                        {blog.publishedAt.split("T")[0]} by{" "}
                        {blog.author || "Admin"}
                      </Text>
                    </VStack>
                    <Flex justify="center" mt={4} pb={2}>
                      {" "}
                      {/* Added padding bottom */}
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
                  </MotionBox>
                </motion.div>
              </GridItem>
            )
          )}
        </Grid>
      </motion.div>

      {/* Show More Button */}
      {itemsToShow < blogs.length && (
        <Box textAlign="center" mt={8}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn("up", "spring", 0.2, 0.7)} // Animate the button
          >
            <Button
              size="md" // Slightly larger button
              borderRadius="lg"
              px={6}
              py={3}
              fontSize="md"
              fontWeight="medium"
              colorScheme="teal" // Use colorScheme for Chakra's theme colors
              bg={buttonBg} // Override bg if specific color is needed
              color={buttonColor} // Ensure button text color contrasts
              onClick={handleShowMore}
              _hover={{
                transform: "scale(1.05)",
                bg: buttonHoverBg, // Hover state background
                color: buttonColor, // Hover state text color
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
