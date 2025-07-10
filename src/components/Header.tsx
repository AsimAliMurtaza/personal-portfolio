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
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaCode } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import React from "react";
import { ColorModeSwitcher } from "./ui/colormode";

const MotionBox = motion(Box);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("teal.400", "green.100");
  const headerColor = useColorModeValue("white", "black");
  return (
    <Container
      as="nav"
      maxW="100%"
      position="fixed"
      top="0"
      height={16}
      zIndex="1000"
      px={4}
      bg={headerColor}
    >
      <Flex align="center" h="100%">
        <Text
          _hover={{ cursor: "pointer" }}
          fontSize="2xl"
          fontWeight="bold"
          color={textColor}
        >
          <ScrollLink to="home" smooth={true} duration={500} offset={-70}>
            <Icon as={FaCode} mr={2} /> Asim
          </ScrollLink>
        </Text>
        <Spacer />

        <HStack spacing={4}>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <ScrollLink to="about" smooth={true} duration={500} offset={-70}>
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

            <ScrollLink to="services" smooth={true} duration={500} offset={-70}>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.400",
                  },
                }}
              >
                SERVICES
              </ChakraLink>
            </ScrollLink>
            <ScrollLink to="skills" smooth={true} duration={500} offset={-70}>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.400",
                  },
                }}
              >
                SKILLS
              </ChakraLink>
            </ScrollLink>
            <ScrollLink to="resume" smooth={true} duration={500} offset={-70}>
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

            <ScrollLink to="blogs" smooth={true} duration={500} offset={-70}>
              <ChakraLink
                sx={{
                  _hover: {
                    color: "green.400",
                  },
                }}
              >
                BLOGS
              </ChakraLink>
            </ScrollLink>

            <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
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
          <ColorModeSwitcher />
        </HStack>

        <IconButton
          aria-label="Open Menu"
          icon={<HiMenu />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          borderRadius={"full"}
          variant={"ghost"}
        />
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          sx={{
            backdropFilter: "blur(10px)",
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
            Portfolio
          </DrawerHeader>
          <DrawerBody>
            <VStack as="nav" spacing={4} alignItems="left">
              <ColorModeSwitcher />
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
                to="services"
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
                  SERVICES
                </ChakraLink>
              </ScrollLink>
              <ScrollLink
                to="skills"
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
                  SKILLS
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
  );
};

export default Navbar;
