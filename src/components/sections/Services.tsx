import { useEffect, useState, useRef } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import useInView from "@/lib/useInView";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Service {
  id: string;
  title: string;
  description: string;
}

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { rootMargin: "-100px" });
  const [services, setServices] = useState<Service[]>([]);

  const headingColor = useColorModeValue("green.500", "green.300");
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const cardBgColor = useColorModeValue("gray.100", "gray.800");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, "services");
        const querySnapshot = await getDocs(servicesCollection);

        const fetchedServices: Service[] = [];
        querySnapshot.forEach((doc) => {
          fetchedServices.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
          });
        });

        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      transition={{ duration: 0.7 }}
    >
      <Container
        maxW="100%"
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        my={{ base: "100px", md: "80px" }}
        bg={bgColor}
        p={5}
        borderRadius="lg"
      >
        <Heading as="h2" color={headingColor} mb={10} fontWeight="thin">
          SERVICES
        </Heading>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap={5}
          >
            {services.map((service) => (
              <GridItem key={service.id}>
                <Box
                  bg={cardBgColor}
                  p={5}
                  borderRadius="10px"
                  boxShadow="md"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Heading as="h3" size="lg" color={headingColor} mb={3}>
                    {service.title}
                  </Heading>
                  <Text color={textColor}>{service.description}</Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Services;
