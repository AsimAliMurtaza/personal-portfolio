'use client';
import { useState, useEffect } from "react";
import AboutMe from "@/components/sections/AboutMe";
import ContactMe from "@/components/sections/ContactMe";
import Home from "@/components/sections/Home";
import Portfolio from "@/components/sections/Portfolio";
import Resume from "@/components/sections/Resume";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";

export default function App() {

  return (
    <div>
      <Home />
      <AboutMe />
      <Services />
      <Skills />
      <Resume />
      <Portfolio />
      <ContactMe />
    </div>
  );
}
