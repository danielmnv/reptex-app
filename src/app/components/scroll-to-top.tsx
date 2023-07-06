"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/pro-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop = () => {
  // States
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Go to top function
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Hooks
  useEffect(() => {
    const updatePosition = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="bg-neutral bg-opacity-50 py-2 px-3 text-gray-300 rounded-xl border-none fixed bottom-3 left-3 md:bottom-8 md:left-12 z-[151]"
          onClick={goToTop}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} size="lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
