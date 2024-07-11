"use client";
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Spacer,
  Icon,
  HStack,
  VStack,
  Container,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaCode } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import React from "react";

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
        <Box
          as="nav"
          position="fixed"
          top="0"
          width="100%"
          height="60px"
          bg="rgba(0.3,0.2,0.39, 0.4)" // Semi-transparent background
          color="white"
          
        >
          <Flex align="center" mt="2" ml="5">
            <HStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="green.400">
                <Icon as={FaCode} mr={2} /> Asim&apos;s Portfolio
              </Text>
              <HStack
                as="nav"
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <ScrollLink to="home" smooth={true} duration={500} offset={-70}>
                  <ChakraLink
                    sx={{
                      _hover: {
                        color: "green.400",
                      },
                    }}
                  >
                    HOME
                  </ChakraLink>
                </ScrollLink>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  <ChakraLink
                    sx={{
                      _hover: {
                        color: "green.400",
                      },
                    }}
                  >
                    ABOUT
                  </ChakraLink>
                </ScrollLink>
                <ScrollLink
                  to="resume"
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  <ChakraLink
                    sx={{
                      _hover: {
                        color: "green.400",
                      },
                    }}
                  >
                    RESUME
                  </ChakraLink>
                </ScrollLink>
                <ScrollLink
                  to="portfolio"
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  <ChakraLink
                    sx={{
                      _hover: {
                        color: "green.400",
                      },
                    }}
                  >
                    PORTFOLIO
                  </ChakraLink>
                </ScrollLink>

                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-70}
                >
                  <ChakraLink
                    sx={{
                      _hover: {
                        color: "green.400",
                      },
                    }}
                  >
                    CONTACT
                  </ChakraLink>
                </ScrollLink>
              </HStack>
            </HStack>
            <Spacer />
            <HStack
              spacing={4}
              display={{ base: "none", md: "flex" }}
              marginRight={10}
            >
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.400",
                  },
                }}
                href="mailto:mo.asim.murtaza@gmail.com"
              >
                <Icon as={MdEmail} />
              </ChakraLink>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.400",
                  },
                }}
                href="https://x.com/heyits_asim"
              >
                <Icon as={FaTwitter} />
              </ChakraLink>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.400",
                  },
                }}
                href="https://www.linkedin.com/asimalimurtaza"
              >
                <Icon as={FaLinkedin} />
              </ChakraLink>
            </HStack>
            <IconButton
              aria-label="Open Menu"
              icon={<HiMenu />}
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
            />
          </Flex>
          <Container maxW="container.xl" mx="auto" my={{ base: "100px", md: "80px" }}>
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent
                sx={{
                  backdropFilter: "blur(5px)",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                <DrawerCloseButton
                  sx={{
                    _hover: {
                      color: "green.100",
                    },
                  }}
                />
                <DrawerHeader
                  sx={{
                    color: "green.400",
                  }}
                >
                  Personal Portfolio
                </DrawerHeader>
                <DrawerBody>
                  <VStack as="nav" spacing={4} alignItems="left">
                    <ScrollLink
                      to="home"
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={onClose}
                    >
                      <ChakraLink
                        sx={{
                          _hover: {
                            color: "green.100",
                          },
                        }}
                      >
                        HOME
                      </ChakraLink>
                    </ScrollLink>
                    <ScrollLink
                      to="about"
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={onClose}
                    >
                      <ChakraLink
                        sx={{
                          _hover: {
                            color: "green.100",
                          },
                        }}
                      >
                        ABOUT
                      </ChakraLink>
                    </ScrollLink>
                    <ScrollLink
                      to="resume"
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={onClose}
                    >
                      <ChakraLink
                        sx={{
                          _hover: {
                            color: "green.100",
                          },
                        }}
                      >
                        RESUME
                      </ChakraLink>
                    </ScrollLink>
                    <ScrollLink
                      to="portfolio"
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={onClose}
                    >
                      <ChakraLink
                        sx={{
                          _hover: {
                            color: "green.100",
                          },
                        }}
                      >
                        PORTFOLIO
                      </ChakraLink>
                    </ScrollLink>

                    <ScrollLink
                      to="contact"
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={onClose}
                    >
                      <ChakraLink
                        sx={{
                          _hover: {
                            color: "green.100",
                          },
                        }}
                      >
                        CONTACT
                      </ChakraLink>
                    </ScrollLink>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Container>
        </Box>
    </motion.div>
  );
};

export default Navbar;
