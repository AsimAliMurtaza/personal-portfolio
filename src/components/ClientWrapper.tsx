"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/Header";
import PageFooter from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion(Box);

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000); // Adjust as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LoadingScreen />
        </motion.div>
      ) : (
        <MotionBox
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          bg="black"
        >
          <Navbar />
          {children}
          <Analytics />
          <PageFooter />
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
