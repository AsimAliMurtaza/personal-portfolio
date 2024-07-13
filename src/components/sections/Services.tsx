import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRef } from "react";
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
  const isInView = useInView(ref, { rootMargin: "-200px" });
  const [services, setServices] = useState<Service[]>([]);

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
        maxW="container.xl"
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        my={{ base: "100px", md: "80px" }}
      >
        <Heading as="h2" color="green.400" mb={10} fontWeight="thin">
          SERVICES
        </Heading>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -300, y: 200 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -300, y: isInView ? 0 : 200 }}
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
                  bg="rgba(255, 255, 255, 0.2)"
                  p={5}
                  borderRadius="10px"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Heading as="h3" size="xl" color="green.100" mb={3}>
                    {service.title}
                  </Heading>
                  <Text color="white">{service.description}</Text>
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
