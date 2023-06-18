"use client";

import React, { useContext, useRef } from "react";
import { Stats } from "./stats";
import { ResponsiveContext } from "../context/responsive.context";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { Purposes } from "./purposes";
import { Experience } from "./experience";
import { Brands } from "./brands";
import { Reviews } from "./reviews";

export const Landing = () => {
  return (
    <div className="bg-[#f7f7f7]">
      <Banner />
      <Purposes />
      <Experience />
      <Brands />
      <Reviews />
      <Stats />
    </div>
  );
};

const Banner = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isTabletOrMobile = useTabletOrMobileQuery();

  const letters = Array.from(
    "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
  );

  // In view animations
  const isHeadingInView = useInView(headingRef, { once: true });
  const isImageInView = useInView(imageRef, { once: true });
  const areButtonsInView = useInView(buttonsRef, { once: true });

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start", "end"],
  });
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.25],
    [isTabletOrMobile ? "12px" : "25px", "1px"]
  );

  // Presence animations
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.01, delayChildren: 0.02 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "just",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "tween",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="section min-h-screen">
      <div className="relative ds-hero">
        <div className="ds-hero-content container w-full pt-8 lg:!pt-32 flex-col gap-y-20 justify-between lg:flex-row">
          <div className="flex flex-col gap-y-6 justify-center lg:just4ify-start">
            <motion.h1
              ref={headingRef}
              className="text-4xl md:text-7xl text-center lg:text-left text-slate-700 font-bold"
              style={{
                transform: isHeadingInView
                  ? "none"
                  : isTabletOrMobile
                  ? "translateY(-150px)"
                  : "translateX(-150px)",
                opacity: isHeadingInView ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
              }}
            >
              <span>Box Office News</span>
              <br />
              <motion.span
                className="text-transparent text-5xl md:text-8xl bg-clip-text bg-gradient-to-r from-primary to-sky-300"
                style={{ letterSpacing }}
              >
                Delivery
              </motion.span>
            </motion.h1>

            <div className="flex justify-center lg:justify-start">
              <motion.p
                className="justify-center lg:justify-start md:max-w-md text-slate-400 flex flex-wrap"
                style={{ overflow: "hidden" }}
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {letters.map((letter, index) => (
                  <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.p>
              <p className=""></p>
            </div>

            <motion.div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
              style={{
                opacity: areButtonsInView ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
              }}
            >
              <button className="ds-btn ds-btn-primary">Get Started</button>
              <button className="ds-btn ds-btn-ghost ds-btn-active">
                Get Started
              </button>
            </motion.div>
          </div>

          <motion.img
            ref={imageRef}
            src="/img/anniversary-reptex.jpg"
            className="max-w-full px-10 sm:px-0 sm:max-w-sm rounded-lg shadow-2xl ds-mask ds-mask-squircle"
            style={{
              transform: isImageInView
                ? "none"
                : isTabletOrMobile
                ? "scale(0)"
                : "translateX(150px)",
              opacity: isImageInView ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
            }}
          />
        </div>
      </div>
    </div>
  );
};
