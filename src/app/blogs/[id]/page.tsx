"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Heading,
  Image,
  Text,
  Box,
  Skeleton,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  publishedAt: string;
  author: string;
}

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Define colors for light and dark modes
  const headingColor = useColorModeValue("teal.500", "green.300");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "black");

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");

        const data: Blog = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Container maxW="container.md" py={20}>
        <Skeleton height="40px" my="10px" />
        <Skeleton height="200px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="100px" />
      </Container>
    );

  if (!blog)
    return (
      <Container maxW="container.md" py={20} bg={bgColor} textAlign="center">
        <Heading color="red.400">Blog Not Found</Heading>
      </Container>
    );

  return (
    <Container
      maxW="container.md"
      py={20}
      bg={bgColor}
      minH={{ base: "80vh", md: "90vh" }}
    >
      <Heading as="h1" size="xl" color={headingColor} mb={4} textAlign="center">
        {blog.title}
      </Heading>
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Published on {new Date(blog.publishedAt).toDateString()}
      </Text>
      <Text fontSize="sm" color="gray.500" textAlign="center" mb={6}>
        Author: {blog.author}
      </Text>
      <Divider mb={6} />
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
