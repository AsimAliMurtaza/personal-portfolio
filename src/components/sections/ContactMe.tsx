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
} from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

import { fetchContactData } from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";

// Define interfaces for data
interface ContactData extends DocumentData {
  description: string;
  email: string;
  phone: string;
  address: string;
}

export default function ContactMe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {rootMargin: "-200px"});

  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchContactData();
        console.log("Fetched data:", data);
        setContactData(data as ContactData); // Asserting data type to ContactData
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
          "There was an error sending your message. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.7 }}
    >
      <Container maxW="container.xl" mx="auto" id="contact" my={{ base: "100px", md: "150px" }}>
        <Heading
          as="h2"
          size="xl"
          color="green.400"
          textAlign="center"
          mb={10}
          fontWeight="thin"
        >
          CONTACT
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
          <GridItem>
            <Box>
              <Heading as="h2" size="lg" color="green.100" mb={5}>
                Just say Hello
              </Heading>
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align="start">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    variant="outline"
                    focusBorderColor="green.100"
                    color="white"
                  />
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    variant="outline"
                    focusBorderColor="green.100"
                    color="white"
                  />
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Your Subject"
                    variant="outline"
                    focusBorderColor="green.100"
                    color="white"
                  />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    variant="outline"
                    focusBorderColor="green.100"
                    color="white"
                  />
                  <Button
                    type="submit"
                    colorScheme="green"
                    alignSelf="flex-start"
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Heading as="h2" size="lg" color="green.100" mb={5}>
                Contact Info
              </Heading>
              <VStack align="start" spacing={5} color="white">
                <Text>{contactData?.description}</Text>
                <HStack spacing={4}>
                  <FaEnvelope />
                  <VStack align="start" spacing={1}>
                    <Text color="green.100">Email</Text>
                    <Text>{contactData?.email}</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <FaPhone />
                  <VStack align="start" spacing={1}>
                    <Text color="green.100">Phone</Text>
                    <Text>{contactData?.phone}</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <FaMapMarkerAlt />
                  <VStack align="start" spacing={1}>
                    <Text color="green.100">Address</Text>
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
