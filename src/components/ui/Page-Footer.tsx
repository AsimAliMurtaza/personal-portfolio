import { Container, Heading, Text } from "@chakra-ui/react";

export default function PageFooter() {
  return (
    <Container maxW="container.xl" mt={20} mb={10} textAlign="center">
      <footer>
        <Text color="white" textAlign="center" mt={5} fontWeight={"thin"}>
          &copy; {new Date().getFullYear()} Designed & Developed by Asim Ali
          Murtaza
        </Text>
      </footer>
    </Container>
  );
}
