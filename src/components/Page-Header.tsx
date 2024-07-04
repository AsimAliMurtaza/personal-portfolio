// components/Navbar.js
import { Box, Container, Image, Flex } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      width="100%"
      bg="transparent"
      color="white"
      p={4}
      zIndex="1000"
      backdropFilter="blur(10px)" // This adds a slight blur effect to the background
    >
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image
          src="https://images.unsplash.com/photo-1719843703680-8c3b0d88b6b4?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo"
          boxSize="60px"
          objectFit="cover"
          borderRadius="full"
        />
        <Flex as="ul" listStyleType="none" margin="0" padding="0" alignItems="center">
          <Box as="li" marginX={4}>
            <Link href="/" passHref>
              <Box  _hover={{  color: "gray.400"}}>HOME</Box>
            </Link>
          </Box>
          <Box as="li" marginX={4}>
            <Link href="/about" passHref>
              <Box _hover={{ color: "gray.400"}}>ABOUT</Box>
            </Link>
          </Box>
          <Box as="li" marginX={4}>
            <Link href="/about" passHref>
              <Box _hover={{  color: "gray.400" }}>RESUME</Box>
            </Link>
          </Box>
          <Box as="li" marginX={4}>
            <Link href="/about" passHref>
              <Box _hover={{ color: "gray.400" }}>PORTFOLIO</Box>
            </Link>
          </Box>
          <Box as="li" marginX={4}>
            <Link href="/contact" passHref>
              <Box sx={{
              }} _hover={{  color: "gray.400" }}>CONTACT</Box>
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
