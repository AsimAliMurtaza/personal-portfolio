"use client";

import { useEffect, useState, useRef } from "react";
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
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Components } from "react-markdown"; // Import Components type from react-markdown
import LoadingScreen from "@/components/ui/LoadingScreen";

// --- Animation Variants (Consistent with other components) ---
// It's highly recommended to move these to a separate utility file (e.g., `lib/motionVariants.ts`)
// and import them to avoid repetition and maintain a single source of truth.

const fadeIn = (
  direction: "up" | "down" | "left" | "right", // Enforce specific directions
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
  content: string;
  image?: string;
  publishedAt: string;
  author: string;
}

export default function BlogPage() {
  // Fix for useParams type:
  // useParams returns a dynamic object where keys are route params.
  // We explicitly cast `params.id` to `string | undefined` as we expect a single string ID.
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Handles string[] case if ever, otherwise string or undefined

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Define colors for light and dark modes
  const headingColor = useColorModeValue("teal.500", "green.300");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const bgColor = useColorModeValue("white", "black");
  const buttonBg = useColorModeValue("teal.300", "green.200");
  const codeBgLight = useColorModeValue("gray.100", "whiteAlpha.200"); // Specific color for code blocks
  const inlineCodeBgLight = useColorModeValue("gray.200", "gray.600"); // Specific color for inline code

  useEffect(() => {
    // Ensure `id` is a string before proceeding
    if (typeof id !== "string") {
      setLoading(false); // If no ID, stop loading and show not found
      return;
    }

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.statusText}`);
        }

        const data: Blog = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
        // Add dummy data for development if API fails
        setBlog({
          id: "dummy-blog-1",
          title: "Exploring the Wonders of Modern Web Development",
          content: `
# Introduction to Web Development

Web development has come a long way. From static pages to dynamic, interactive applications, the possibilities are endless.

## The Frontend Journey

The frontend is where user interaction happens. Key technologies include:

* **HTML**: The structure of web pages.
* **CSS**: Styling and layout.
* **JavaScript**: Interactivity and dynamic content.

### Popular Frameworks

Modern frontend development often uses frameworks:

1.  **React**: A declarative, component-based library.
2.  **Vue.js**: A progressive framework.
3.  **Angular**: A comprehensive framework for large applications.

\`\`\`javascript
// Example React Component
function MyButton() {
  return <button onClick={() => alert('Clicked!')}>Click Me</button>;
}
\`\`\`

## The Backend Powerhouse

The backend handles data, logic, and server operations.

* **Node.js**: JavaScript runtime for server-side.
* **Python (Django/Flask)**: Versatile for web and data science.
* **Go**: Efficient and performant for microservices.

### Databases

Choosing the right database is crucial:

* **SQL Databases**: PostgreSQL, MySQL
* **NoSQL Databases**: MongoDB, Cassandra

\`\`\`python
# Example Python Flask route
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

## Deployment and Beyond

Once developed, applications need to be deployed. Cloud platforms like AWS, Google Cloud, and Azure offer robust solutions. Continuous Integration/Continuous Deployment (CI/CD) pipelines automate the process.

Stay tuned for more in-depth articles on specific topics!
`,
          image: "/images/blog-placeholder.jpg", // Placeholder image
          publishedAt: "2023-06-15T10:30:00Z",
          author: "Developer Pro",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]); // id is a dependency

  // Define variants for the staggered entry of elements
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each child animation
        delayChildren: 0.3, // Initial delay before first child animates
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
  };

  if (loading)
    return (
      <Container
        maxW="container.xl"
        py={64}
        bg={bgColor}
        textAlign="center"
        as={motion.div}
        initial="hidden"
        animate="show"
        variants={containerVariants}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
       <Spinner
          size="xl"
          thickness="4px"
          speed="0.5s"
          color={headingColor}
          emptyColor="gray.200"
          sx={{ filter: "drop-shadow(0px 0px 8px rgba(72, 187, 120, 0.8))" }}
        />
      </Container>
    );

  if (!blog)
    return (
      <Container maxW="container.md" py={20} bg={bgColor} textAlign="center">
        <Heading color="red.400">Blog Not Found</Heading>
      </Container>
    );

  // Define components for ReactMarkdown
  // Use the 'Components' type from 'react-markdown' for better type safety
  const markdownComponents: Components = {
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
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      // For block code
      return match ? (
        <Box
          as="pre"
          p={3}
          my={4}
          bg={codeBgLight} // Use the specific color variable
          borderRadius="md"
          overflowX="auto"
          fontFamily="consolas"
        >
          <code className={className} {...props}>
            {children}
          </code>
        </Box>
      ) : (
        // For inline code
        <Text
          as="code"
          bg={inlineCodeBgLight} // Use the specific color variable
          px={1}
          py={0.5}
          borderRadius="sm"
          fontFamily="monospace"
        >
          {children}
        </Text>
      );
    },
    // Add other markdown elements as needed, e.g., img, blockquote, table etc.
    img: ({ node, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          margin: "20px auto",
        }}
        {...props}
        alt={props.alt || ""}
      />
    ),
    blockquote: ({ children }) => (
      <Box
        as="blockquote"
        pl={4}
        borderLeft="4px solid"
        borderColor={headingColor}
        fontStyle="italic"
        my={4}
      >
        {children}
      </Box>
    ),
  };

  return (
    <Container
      maxW="container.lg"
      py={20}
      bg={bgColor}
      minH={{ base: "80vh", md: "90vh" }}
      as={motion.div}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Back Button Animation */}
      <motion.div variants={fadeIn("up", "tween", 0, 0.5)}>
        <Button
          size="sm"
          borderRadius="10px"
          variant="outline"
          color={buttonBg}
          mb={6}
          onClick={() => router.push("/")} // Assumed to go back to home or a blogs listing
        >
          Back
        </Button>
      </motion.div>

      <VStack spacing={4} align="stretch">
        {/* Blog Title Animation */}
        <motion.div variants={itemVariants}>
          <Heading as="h1" size="xl" color={headingColor} textAlign="center">
            {blog.title}
          </Heading>
        </motion.div>

        {/* Published Date and Author Animation */}
        <motion.div variants={itemVariants}>
          <Text fontSize="sm" color={subTextColor} textAlign="center">
            Published on {new Date(blog.publishedAt).toDateString()} by{" "}
            {blog.author}
          </Text>
        </motion.div>

        {/* Divider Animation */}
        <motion.div variants={itemVariants}>
          <Divider my={4} />
        </motion.div>

        {/* Blog Image Animation */}
        {blog.image && (
          <motion.div variants={itemVariants}>
            <Image
              src={blog.image}
              alt={blog.title}
              borderRadius="lg"
              mb={6}
              objectFit="cover"
              width="100%"
              maxH="400px"
            />
          </motion.div>
        )}

        {/* Blog Content Animation */}
        <motion.div variants={itemVariants}>
          <Box color={textColor} fontSize="md" lineHeight="tall">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {blog.content}
            </ReactMarkdown>
          </Box>
        </motion.div>
      </VStack>
    </Container>
  );
}
