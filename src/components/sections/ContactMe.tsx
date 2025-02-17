"use client";

import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { fetchContactData } from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";

interface ContactData extends DocumentData {
  description: string;
  email: string;
  phone: string;
  address: string;
}

const MotionVStack = motion(VStack);

export default function ContactMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });

  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const toast = useToast();

  const inputBorderColor = useColorModeValue("teal.300", "green.200");
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const bgColor = useColorModeValue("white", "black");
  const cardBg = useColorModeValue("gray.50", "black");
  const hoverColor = useColorModeValue("black", "white");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchContactData();
        setContactData(data as ContactData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_xiizqqq",
        "template_vz3i66q",
        formData,
        "TRga4OXOfsikRc02H"
      );
      toast({
        title: "Message Sent.",
        description: "Your message has been sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error.",
        description:
          "Sending messages have been disabled. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        id="contact"
        my={{ base: "100px", md: "80px" }}
        bg={bgColor}
        textAlign="center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            as="h1"
            color={headingColor}
            mb={10}
            fontSize="4xl"
            fontWeight="semibold"
            letterSpacing="wide"
          >
            Get in Touch
          </Heading>
        </motion.div>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={8}
          alignItems="center"
        >
          {/* Contact Form */}
          <GridItem>
            <Box
              p={6}
              borderRadius="xl"
              boxShadow="md"
              bg={cardBg}
              minH={{ base: "auto", md: "420px" }}
            >
              <Heading
                as="h3"
                size="lg"
                textAlign={"left"}
                color={headingColor}
                mb={5}
              >
                Just Say Hello 👋
              </Heading>
              <form onSubmit={handleSubmit}>
                <MotionVStack
                  spacing={3}
                  align="stretch"
                  overflow="hidden"
                  initial={{ opacity: 0, x: -40, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    variant="filled"
                    focusBorderColor={inputBorderColor}
                    color={textColor}
                    borderRadius="lg"
                  />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    variant="filled"
                    focusBorderColor={inputBorderColor}
                    color={textColor}
                    borderRadius="lg"
                  />
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    variant="filled"
                    focusBorderColor={inputBorderColor}
                    color={textColor}
                    borderRadius="lg"
                  />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    variant="filled"
                    focusBorderColor={inputBorderColor}
                    color={textColor}
                    borderRadius="lg"
                    rows={3}
                  />
                  <Button
                    type="submit"
                    bg={headingColor}
                    textColor={bgColor}
                    size="lg"
                    borderRadius="full"
                    _hover={{ color: hoverColor }}
                  >
                    Send Message
                  </Button>
                </MotionVStack>
              </form>
            </Box>
          </GridItem>

          {/* Contact Info */}
          <GridItem>
            <Box
              minH={{ base: "auto", md: "420px" }}
              p={6}
              borderRadius="xl"
              boxShadow="md"
              bg={cardBg}
            >
              <Heading
                as="h3"
                size="lg"
                textAlign={"left"}
                color={headingColor}
                mb={5}
              >
                Contact Info
              </Heading>
              <VStack align="start" spacing={5} color={textColor}>
                <Text textAlign={"left"} fontSize="md">
                  {contactData?.description}
                </Text>
                <HStack spacing={4}>
                  <FaEnvelope />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" color={headingColor}>
                      Email
                    </Text>
                    <Text>{contactData?.email}</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <FaPhone />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" color={headingColor}>
                      Phone
                    </Text>
                    <Text>{contactData?.phone}</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <FaMapMarkerAlt />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" color={headingColor}>
                      Address
                    </Text>
                    <Text>{contactData?.address}</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </motion.div>
  );
}
