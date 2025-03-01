"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState(0);
  const [isComplete, setIsComplete] = useState(false); // Track completion

  useEffect(() => {
    setProgress(0);
    setKey((prevKey) => prevKey + 1);
    setIsComplete(false); // Reset completion state

    setTimeout(() => {
      setProgress(20);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsComplete(true), 500); // Make it fade out after animation
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <motion.div
      key={key}
      className="fixed top-0 left-0 h-[3px] z-100"
      initial={{ width: "0%", opacity: 1, backgroundColor: "#22d3ee" }} // Cyan color
      animate={{
        width: `${progress}%`,
        opacity: isComplete ? 0 : 1, // Fade out when complete
      }}
      transition={{ ease: "easeOut", duration: 0.5 }}
    />
  );
}
