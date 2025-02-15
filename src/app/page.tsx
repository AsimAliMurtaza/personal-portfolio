"use client";
import AboutMe from "@/components/sections/AboutMe";
import ContactMe from "@/components/sections/ContactMe";
import Home from "@/components/sections/Home";
import Portfolio from "@/components/sections/Portfolio";
import Resume from "@/components/sections/Resume";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import { Container, useColorModeValue } from "@chakra-ui/react";

export default function App() {
  const bgColor = useColorModeValue("white", "black");
  return (
      <Container maxW="container.xl" bg={bgColor}>
        <Home />
        <AboutMe />
        <Services />
        <Skills />
        <Resume />
        <Portfolio />
        <ContactMe />
      </Container>
  );
}
