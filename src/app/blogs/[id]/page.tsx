"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Heading,
  Image,
  Text,
  Box,
  VStack,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables tables, strikethrough, etc.

interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  publishedAt: string;
}

export default function BlogPage() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Define colors for light and dark modes
  const headingColor = useColorModeValue("teal.400", "green.300");
  const textColor = useColorModeValue("gray.800", "gray.300");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      setLoading(true);

      try {
        const blogDoc = await getDoc(doc(db, "blogs", id as string));

        if (blogDoc.exists()) {
          setBlog({
            id: blogDoc.id,
            title: blogDoc.data().title,
            content: blogDoc.data().content, // Full blog content
            image: blogDoc.data().image,
            publishedAt: blogDoc.data().publishedAt,
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }

      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Container maxW="container.md" py={10}>
        <Skeleton height="40px" my="10px" />
        <Skeleton height="200px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="100px" />
      </Container>
    );

  if (!blog)
    return (
      <Container maxW="container.md" py={10} textAlign="center">
        <Heading color="red.400">Blog Not Found</Heading>
      </Container>
    );

  return (
    <Container maxW="container.md" py={20} minH={{ base: "80vh", md: "90vh" }}>
      <Heading as="h1" size="xl" color={headingColor} mb={4} textAlign="center">
        {blog.title}
      </Heading>
      <Text fontSize="sm" color="gray.500" textAlign="center" mb={6}>
        Published on {new Date(blog.publishedAt).toDateString()}
      </Text>
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          borderRadius="lg"
          mb={6}
          objectFit="cover"
          width="100%"
          maxH="400px"
        />
      )}

      <Box color={textColor} fontSize="md" lineHeight="tall">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <Heading as="h1" size="xl" color={headingColor} my={4}>
                {children}
              </Heading>
            ),
            h2: ({ children }) => (
              <Heading as="h2" size="lg" color={headingColor} my={3}>
                {children}
              </Heading>
            ),
            h3: ({ children }) => (
              <Heading as="h3" size="md" color={headingColor} my={3}>
                {children}
              </Heading>
            ),
            p: ({ children }) => <Text mb={4}>{children}</Text>,
            ul: ({ children }) => (
              <Box as="ul" pl={5} mb={4} style={{ listStyleType: "disc" }}>
                {children}
              </Box>
            ),
            ol: ({ children }) => (
              <Box as="ol" pl={5} mb={4} style={{ listStyleType: "decimal" }}>
                {children}
              </Box>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                style={{ color: "#38B2AC", textDecoration: "underline" }}
              >
                {children}
              </a>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}
