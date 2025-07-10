"use client";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  Progress,
  Icon,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaCss3, FaReact, FaPython, FaGit, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiGooglegemini,
  SiTensorflow,
  SiAwslambda,
} from "react-icons/si";

interface Skill {
  id: string;
  skill: string;
  value: number;
}

const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });

  const [skills, setSkills] = useState<Skill[]>([]);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.900", "green.200");
  const progressColorScheme = useColorModeValue("teal", "green");
  const iconColor = useColorModeValue("teal.400", "green.200");
  const bgColor = useColorModeValue("white", "black");
  const cardHoverBgColor = useColorModeValue("gray.100", "gray.700");
  const cardBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.15)",
    "rgba(30, 30, 30, 0.5)"
  );
  // const scrollButtonColor = useColorModeValue("teal.100", "green.200");

  const iconsList = [
    SiNextdotjs,
    FaReact,
    FaPython,
    FaAws,
    SiGooglegemini,
    SiTensorflow,
    FaGit,
    SiAwslambda,
  ];

  const iconsTitle = [
    "Next.js",
    "React",
    "Python",
    "AWS",
    "Gemini",
    "TensorFlow",
    "Git",
    "AWS Lambda",
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const querySnapshot = await getDocs(skillsCollection);

        const fetchedSkills: Skill[] = [];
        querySnapshot.forEach((doc) => {
          fetchedSkills.push({
            id: doc.id,
            skill: doc.data().skill,
            value: doc.data().value,
          });
        });

        setSkills(fetchedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const scrollSkills = (direction: "up" | "down") => {
    if (skillsContainerRef.current) {
      skillsContainerRef.current.scrollBy({
        top: direction === "up" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxW="6xl" py={24} bg={bgColor} id="skills">
        <Heading
          as="h1"
          color={headingColor}
          mb={10}
          fontSize="4xl"
          fontWeight="semibold"
          letterSpacing="wide"
          textAlign="center"
        >
          My Skills
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
          {/* Skill Icons */}
          <GridItem>
            <Text
              fontSize="xl"
              fontWeight="medium"
              mb={6}
              color={textColor}
              textAlign="center"
            >
              Here are the skills I&apos;ve honed in my field of work.
            </Text>
            <Grid
              templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]}
              gap={6}
              justifyContent="center"
            >
              {iconsList.map((IconComponent, index) => (
                <GridItem key={index}>
                  <VStack spacing={2} align="center">
                    <MotionBox
                      borderRadius="full"
                      bg={cardBgColor}
                      p={6}
                      _hover={{
                        transform: "scale(1.05)",
                        bg: cardHoverBgColor,
                      }}
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
                      <Icon as={IconComponent} boxSize={20} color={iconColor} />
                    </MotionBox>
                    <MotionText
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
                      color={textColor}
                      fontWeight="medium"
                    >
                      {iconsTitle[index]}
                    </MotionText>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </GridItem>

          {/* Skill Progress Bars with Scroll Buttons */}
          <GridItem>
            <VStack spacing={12} align="center" position="relative">
              {/* <Button
                position="absolute"
                top="-50px"
                left="50%"
                transform="translateY(30%)"
                bg={scrollButtonColor}
                borderRadius="full"
                size="sm"
                onClick={() => scrollSkills("up")}
                _hover={{ transform: "scale(1.1)" }}
              >
                <Icon color={"black"} as={FaArrowUp} />
              </Button> */}

              <Box
                ref={skillsContainerRef}
                maxH="400px"
                overflowY="auto"
                width="100%"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(72, 187, 120, 0.8)",
                    borderRadius: "10px",
                  },
                }}
              >
                {skills.map((skill) => (
                  <MotionBox
                    key={skill.id}
                    width="100%"
                    bg={cardBgColor}
                    borderRadius="xl"
                    p={4}
                    mb={4}
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: "lg",
                      bg: cardHoverBgColor,
                    }}
                    overflow="hidden"
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <Text
                      color={textColor}
                      fontSize="lg"
                      fontWeight="medium"
                      mb={2}
                    >
                      {skill.skill}
                    </Text>
                    <Progress
                      colorScheme={progressColorScheme}
                      size="sm"
                      value={skill.value}
                      borderRadius="full"
                    />
                  </MotionBox>
                ))}
              </Box>

              {/* <Button
                position="absolute"
                bottom="-50px"
                left="50%"
                transform="translateY(-30%)"
                bg={scrollButtonColor}
                borderRadius="full"
                size="sm"
                onClick={() => scrollSkills("down")}
                _hover={{ transform: "scale(1.1)" }}
              >
                <Icon color={"black"} as={FaArrowDown} />
              </Button> */}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </motion.div>
  );
}
