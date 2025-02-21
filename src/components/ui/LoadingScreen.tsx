"use client";

import {
  Box,
  Spinner,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Motion wrapper
const MotionBox = motion(Box);

// Interesting facts about coding & web development
const codingFacts = [
  "The first high-level programming language was Fortran, created in 1957.",
  "Ada Lovelace is considered the world's first programmer in the 1800s.",
  "Python was named after Monty Python, not the snake!",
  "JavaScript was created in just 10 days by Brendan Eich in 1995.",
  "Over 70% of coding jobs are outside the tech industry in fields like healthcare and finance.",
  "The first-ever computer bug was a real moth found in a Harvard Mark II computer in 1947!",
  "There are over 700 programming languages worldwide.",
  "The world's first website, info.cern.ch, is still live today!",
  "HTML and CSS are not programming languages but markup and styling languages, respectively.",
  "Linux powers over 96% of the world's top 1 million web servers.",
  "Tim Berners-Lee invented the World Wide Web in 1989.",
  "JavaScript is used on over 97% of all websites today!",
  "The first website ever made was just plain text with no styling.",
  "CSS was introduced in 1996 to separate style from content.",
  "Google Chrome is the most widely used web browser in the world.",
  "Over 60% of internet traffic now comes from mobile devices.",
  "The <canvas> element allows JavaScript to draw graphics and animations directly on a webpage.",
  "Lazy loading can speed up websites by only loading images when they're needed.",
  "Progressive Web Apps (PWAs) can work offline and feel like native apps.",
  "Git was created by Linus Torvalds, the same person who made Linux.",
  "GitHub was founded in 2008 and acquired by Microsoft in 2018 for $7.5 billion.",
  "The first GitHub commit was made on October 19, 2007.",
  "GitHub has over 100 million developers contributing to millions of projects.",
  "The most-starred GitHub repo is freeCodeCamp, a platform for learning web development.",
  "GitHub Copilot, an AI coding assistant, was trained on billions of lines of code.",
  "The 'Octocat' is GitHub's official mascot.",
  "GitHub allows you to host static websites for free using GitHub Pages.",
  "More than 28 million repositories are created on GitHub every year!",
];

const loadingTexts = [
  "Connecting to the database… hope it picks up the phone 📞",
  "Sending a carrier pigeon to the server… 🕊️",
  "Loading… because instant results are only for coffee ☕",
  "Optimizing queries… or just hoping for the best 🤞",
  "Talking to the database… it's thinking… 💭",
  "Negotiating with the API… brb, sending bribes 🍕",
  "Syncing with the server… if it responds, we'll let you know 🤖",
  "Querying the database… SELECT * FROM patience; ⏳",
  "Fetching data… it's running at 2G speeds 🐌",
  "Shhh… the database is sleeping 😴",
  "Hydrating the React tree… someone get a watering can! 🌱",
  "Compiling the Next.js app… please don’t refresh, we’re fragile 💀",
  "Running SSR… Super Speed Rendering? Not really 😆",
  "Fetching API data… this could take an eternity ⏳",
  "Preloading assets… because nobody likes a slow website 🚀",
  "React is rendering… and re-rendering… and re-rendering… 🔄",
  "Optimizing images… yes, even that 5MB cat picture 🐱",
  "Deploying dark mode… because light mode is too mainstream 😎",
  "Ensuring your app is 99.999% bug-free… fingers crossed 🤞",
  "Debugging… wait, why is this working now? 🤨",
  "Fetching latest commits… or should we say adventures in debugging 🕵️",
  "Git merging… if you see a conflict, it’s not our fault 😅",
  "Checking GitHub… waiting for your 1000th commit 🎉",
  "Staging changes… and questioning life choices 🤔",
  "Syncing with GitHub… did you remember to push? 😬",
  "Applying fixes… wait, who wrote this code?! 😵‍💫",
  "Pushing updates… please don’t break, please don’t break 🙏",
  "Reviewing pull requests… *dramatic gasp* 😲",
  "Running `npm install`… grab a snack, this might take a while 🍿",
  "Resolving merge conflicts… send help 🆘",
];

const LoadingScreen = () => {
  const [dotCount, setDotCount] = useState(0);
  const [fact, setFact] = useState("");
  const [randomText, setRandomText] = useState("");

  const textColor = useColorModeValue("teal.300", "green.300");

  useEffect(() => {
    // Select a random fact and loading text on mount
    setFact(codingFacts[Math.floor(Math.random() * codingFacts.length)]);
    setRandomText(
      loadingTexts[Math.floor(Math.random() * loadingTexts.length)]
    );

    // Animate dots (keeps them right-aligned)
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      background="radial-gradient(circle, rgba(10, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%)"
      zIndex="9999"
    >
      <VStack spacing={4} textAlign="center">
        {/* Glowing Animated Spinner */}
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.8s"
          color={textColor}
          emptyColor="gray.700"
          sx={{ filter: "drop-shadow(0px 0px 8px rgba(72, 187, 120, 0.8))" }}
        />

        {/* Random Coding Fact */}
        <Text fontSize="lg" color="gray.400" maxW="80%">
          {fact}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default LoadingScreen;
