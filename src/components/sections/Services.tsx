import { useEffect, useState, useRef } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaCode, FaPaintBrush, FaMobileAlt, FaServer } from "react-icons/fa";

interface Service {
  id: string;
  title: string;
  description: string;
}

// Icon Mapper for Service Types
const getServiceIcon = (title: string) => {
  const icons: { [key: string]: JSX.Element } = {
    Development: <FaCode />,
    Design: <FaPaintBrush />,
    Mobile: <FaMobileAlt />,
    Backend: <FaServer />,
  };
  return icons[title] || <FaCode />;
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });
  const [services, setServices] = useState<Service[]>([]);

  // Theme-based Colors
  const headingColor = useColorModeValue("teal.300", "green.200");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const cardBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.15)",
    "rgba(30, 30, 30, 0.5)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
      }
    };

    fetchServices();
  }, []);

  // Motion Variants for Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Container maxW="6xl" py={24} id="services">
        {/* Section Heading */}
        <motion.div variants={fadeInUp}>
          <Heading
            as="h1"
            color={headingColor}
            mb={10}
            fontSize="4xl"
            fontWeight="semibold"
            letterSpacing="wide"
            textAlign="center"
          >
            My Services
          </Heading>
        </motion.div>

        {/* Services Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          gap={8}
          justifyContent="center"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <GridItem>
                <Box
                  bg={cardBgColor}
                  p={8}
                  borderRadius="xl"
                  boxShadow="lg"
                  border={`1px solid ${borderColor}`}
                  textAlign="center"
                  backdropFilter="blur(10px)"
                  transition="all 0.3s"
                  minH={["auto", "220px"]}
                  maxH={["auto", "220px"]}
                  _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
                >
                  {/* Service Icon */}
                  <Icon
                    as={() => getServiceIcon(service.title)}
                    boxSize={12}
                    color={headingColor}
                    mb={4}
                  />

                  {/* Service Title */}
                  <Heading
                    as="h3"
                    size="lg"
                    color={headingColor}
                    mb={4}
                    fontWeight="semibold"
                  >
                    {service.title}
                  </Heading>

                  {/* Service Description */}
                  <Text
                    color={textColor}
                    fontSize="md"
                    opacity={0.9}
                    fontWeight="medium"
                  >
                    {service.description}
                  </Text>
                </Box>
              </GridItem>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Services;
