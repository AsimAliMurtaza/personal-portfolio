import { Box, Container, Heading, Image, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="container.xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1719776049588-e1997c9066dd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw4N3x8fGVufDB8fHx8fA%3D%3D"
          alt="profile-pic"
          boxSize="250px"
          marginTop={10}
          border={"5px solid white"}
          objectFit="cover"
          borderRadius="full"
        />
      </Box>

      <Container
        maxW="container.md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            color={"white"}
          >
            Hi, I am
          </Heading>
          <Heading as="h2" size="3xl" textAlign="center" color={"#FFE800"}>
            Muhammad Asim Ali Murtaza
          </Heading>
        </Box>
      </Container>
      <Container
        maxW="container.md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          color: "white",
        }}
      >
        <Heading as="h3" size="lg" textAlign="center" mt={5} color={"white"}>
          Full Stack Developer
        </Heading>
        <Text textAlign="center" mt={5} color={"white"}>
          I am a Full Stack Developer with 2 years of experience in building web
          applications. I specialize in JavaScript, TypeScript, React, Node.js,
          and Express.js. I am passionate about learning new technologies and
          building software solutions.
        </Text>
        <Text textAlign="center" mt={5} color={"white"}>
          I am currently looking for new opportunities. If you are looking for a
          Full Stack Developer, feel free to contact me.
        </Text>
      </Container>
    </Container>
  );
}
