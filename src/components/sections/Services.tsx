// components/Services.tsx

import { useEffect, useState, useRef } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Flex,
  useToken,
  VStack,
} from "@chakra-ui/react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaCode, FaPaintBrush, FaMobileAlt, FaServer } from "react-icons/fa";
import { IconType } from "react-icons";

// Assuming these are from your @/lib/motion.ts file
import { fadeIn, staggerContainer } from "@/lib/motion";

interface Service {
  id: string;
  title: string;
  description: string;
}

// Icon Mapper for Service Types
const getServiceIcon = (title: string): IconType => {
  switch (title.toLowerCase()) {
    case "development":
      return FaCode;
    case "design":
      return FaPaintBrush;
    case "mobile":
      return FaMobileAlt;
    case "backend":
      return FaServer;
    default:
      return FaCode; // Default icon
  }
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-150px" });
  const [services, setServices] = useState<Service[]>([]);
  // MotionBox is no longer needed directly inside the map, so can remove if not used elsewhere

  // Theme-based Colors (UNCHANGED from your provided code)
  const [primaryLight, primaryDark] = useToken("colors", [
    "gray.600", // Strong blue for light mode primary
    "green.300", // Softer teal for dark mode primary
  ]);
  const [secondaryLight, secondaryDark] = useToken("colors", [
    "teal.400", // Teal for light mode accent
    "green.300", // Lighter teal for dark mode accent
  ]);
  const [surfaceLight, surfaceDark] = useToken("colors", ["white", "black"]); // Main background
  const [surfaceElevatedLight, surfaceElevatedDark] = useToken("colors", [
    "gray.50", // Light elevated surfaces
    "whiteAlpha.100", // Dark elevated surfaces
  ]);
  const [onSurfaceLight, onSurfaceDark] = useToken("colors", [
    "gray.800", // Text on light surface
    "whiteAlpha.900", // Text on dark surface
  ]);
  const [onSurfaceVariantLight, onSurfaceVariantDark] = useToken("colors", [
    "gray.900", // Secondary text on light surface
    "white", // Secondary text on dark surface
  ]);

  // Derived color mode values (UNCHANGED from your provided code)
  const bg = useColorModeValue(surfaceLight, surfaceDark);
  const cardBg = useColorModeValue(surfaceElevatedLight, surfaceElevatedDark);
  const primaryTextColor = useColorModeValue(onSurfaceLight, onSurfaceDark);
  const secondaryTextColor = useColorModeValue(
    onSurfaceVariantLight,
    onSurfaceVariantDark
  );
  const accentColor = useColorModeValue(secondaryLight, secondaryDark);
  const headingColor = useColorModeValue(primaryLight, primaryDark);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, "services");
        const querySnapshot = await getDocs(servicesCollection);

        const fetchedServices: Service[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[];

        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Optional: Set some fallback/dummy services if fetching fails
        setServices([
          {
            id: "1",
            title: "Development",
            description: "Building robust and scalable web applications.",
          },
          {
            id: "2",
            title: "Design",
            description:
              "Crafting intuitive and visually appealing user interfaces.",
          },
          {
            id: "3",
            title: "Mobile",
            description:
              "Developing cross-platform mobile apps for iOS and Android.",
          },
          {
            id: "4",
            title: "Backend",
            description: "Creating powerful server-side logic and APIs.",
          },
        ]);
      }
    };

    fetchServices();
  }, []);

  return (
    <Box minH="100vh" bg={bg} py={{ base: 10, md: 20 }}>
      <Container maxW="7xl" id="services">
        {/* Section Heading */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <VStack spacing={6} textAlign="center" mb={{ base: 12, md: 20 }}>
            <motion.div variants={fadeIn("up", "spring", 0.2, 1)}>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                color={headingColor}
                fontWeight="semibold"
                letterSpacing="tight"
                lineHeight={1.2}
              >
                My{" "}
                <Box as="span" color={accentColor}>
                  Expert
                </Box>{" "}
                Services
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color={secondaryTextColor}
                maxW="3xl"
                lineHeight="tall"
                mt={4}
              >
                Leveraging cutting-edge technologies to deliver exceptional
                digital solutions tailored to your needs.
              </Text>
            </motion.div>
          </VStack>
        </motion.div>

        {/* Services Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 8, md: 12 }}
          justifyContent="center"
        >
          {services.map((service, index) => (
            // APPLY THE ANIMATION VARIANTS DIRECTLY TO THIS motion.div
            <motion.div
              key={service.id}
              variants={fadeIn("up", "spring", 0.2 * index, 1)} // This controls the one-by-one animation
              initial="hidden" // Ensure it starts hidden
              whileInView="show" // Animate when in view
              viewport={{ once: true, amount: 0.25 }} // Only animate once
            >
              {/* ServiceCard now focuses only on its styling and hover effects */}
              <ServiceCard
                icon={getServiceIcon(service.title)}
                title={service.title}
                description={service.description}
                bg={cardBg}
                textColor={primaryTextColor}
                secondaryTextColor={secondaryTextColor}
                accentColor={accentColor}
              />
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Services;

// ServiceCard component (UNCHANGED from your provided code, as it already has the desired hover effects)
interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  bg: string;
  textColor: string;
  secondaryTextColor: string;
  accentColor: string;
}

const ServiceCard = ({
  icon,
  title,
  description,
  bg,
  textColor,
  secondaryTextColor,
  accentColor,
}: ServiceCardProps) => {
  return (
    <Box
      bg={bg}
      borderRadius="2xl"
      boxShadow={useColorModeValue("md", "dark-sm")}
      p={8}
      h="100%"
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: useColorModeValue("lg", "dark-lg"),
        borderColor: accentColor,
      }}
      textAlign="center"
      position="relative"
      overflow="hidden"
      minH={["auto", "300px"]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      {/* Icon */}
      <Flex
        justify="center"
        align="center"
        w={16}
        h={16}
        bg={useColorModeValue(`${accentColor}.100`, `${accentColor}.700`)}
        borderRadius="full"
        mx="auto"
        mb={6}
        transition="background 0.3s ease"
      >
        <Icon as={icon} boxSize={8} color={accentColor} />
      </Flex>

      {/* Title */}
      <Heading size="lg" color={textColor} mb={3} fontWeight="bold">
        {title}
      </Heading>

      {/* Description */}
      <Text
        color={secondaryTextColor}
        fontSize="md"
        lineHeight="short"
        flex="1"
      >
        {description}
      </Text>
    </Box>
  );
};
