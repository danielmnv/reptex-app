"use client";

import React, { Fragment, RefObject, useContext, useRef } from "react";
import { Stats } from "./stats";
import { ResponsiveContext } from "../../context/responsive.context";
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
import classNames from "classnames";

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
  const container = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isTabletOrMobile = useTabletOrMobileQuery();

  // In view animations
  const isSquareInView = useInView(squareRef, { once: true });

  const images = [
    {
      src: "https://images.immediate.co.uk/production/volatile/sites/32/2020/08/Juki-Walking-Foot-Industrial-Sewing-Machine-0285f11-1.png?quality=90&resize=980,654",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
    },
    {
      src: "https://dimacoindustrial.com/wp-content/uploads/2013/01/41-d-9.jpg",
      gradient: "bg-gradient-to-r from-sky-500 to-indigo-500",
    },
    {
      src: "https://m.media-amazon.com/images/I/610gC9gm2WL.jpg",
      gradient: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    },
    {
      src: "https://m.media-amazon.com/images/I/719WH3I+eWL.jpg",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      src: "https://juki.com/pub/static/version1686946625/frontend/bs_eren/bs_eren3/en_US/images/bundle/L1-JIN.jpg",
      gradient:
        "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
    },
  ];

  return (
    <div className="container">
      <div
        ref={container}
        className="flex lg:justify-between items-start w-full pt-8 lg:pt-0 flex-col gap-y-20 gap-x-12 lg:flex-row lg:min-h-[calc(100vh_*_5)]"
      >
        <div className="lg:sticky top-0 flex justify-center lg:justify-start lg:items-center lg:h-screen w-full">
          <div className="flex flex-col gap-y-6 pt-20 lg:pt-0 justify-center lg:justify-start">
            <HeroTitle />
            <HeroDescription />
            {/* <HeroButtons /> */}
          </div>
        </div>

        <div className="lg:sticky top-0 flex justify-center lg:items-center lg:justify-end h-[calc(100vh_*_5)] lg:h-screen w-full">
          <motion.div
            ref={squareRef}
            className="sticky lg:relative top-28 lg:top-0 aspect-square rounded-lg shadow-2xl h-auto max-h-96 md:h-[500px] md:max-h-min ds-mask ds-mask-squircle"
            style={{
              transform: isSquareInView
                ? "none"
                : isTabletOrMobile
                ? "scale(0)"
                : "translateX(150px)",
              opacity: isSquareInView ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
            }}
          >
            {images.map((img, index) => (
              <Fragment key={`hero-image-card-${index}`}>
                <ImageCard {...img} index={index} target={container} />
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HeroTitle = () => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isTabletOrMobile = useTabletOrMobileQuery();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start", "end"],
  });

  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.25],
    [isTabletOrMobile ? "12px" : "1px", "1px"]
  );

  return (
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
      <span>Descubre el Mundo</span>
      <br />
      <motion.span
        className="text-transparent text-5xl md:text-8xl bg-clip-text bg-gradient-to-r from-primary to-sky-300"
        style={{ letterSpacing }}
      >
        Reptex
      </motion.span>
    </motion.h1>
  );
};

const HeroDescription = () => {
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

  const letters = Array.from(
    "Nos apasiona brindar experiencias excepcionales. Somos tu destino para lo que necesites en el área de confección."
  );

  return (
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
    </div>
  );
};

const HeroButtons = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const areButtonsInView = useInView(buttonsRef, { once: true });

  return (
    <motion.div
      ref={buttonsRef}
      className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
      style={{
        opacity: areButtonsInView ? 1 : 0,
        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
      }}
    >
      <button className="ds-btn ds-btn-primary">Get Started</button>
      <button className="ds-btn ds-btn-ghost ds-btn-active">Get Started</button>
    </motion.div>
  );
};

const ImageCard = ({
  src,
  gradient,
  index,
  target,
}: {
  src: string;
  gradient: string;
  index: number;
  target: RefObject<HTMLDivElement>;
}) => {
  const start = index / 5;
  const end = start + 1 / 5;

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target,
    layoutEffect: false,
  });

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [index === 0 ? 1 : 0, 1]
  );
  const display = useTransform(scrollYProgress, (pos) =>
    pos >= start && pos <= end ? "flex" : "none"
  );

  return (
    <motion.div
      className={classNames(
        "md:absolute inset-0 h-full w-full flex items-center justify-center",
        gradient
      )}
      style={{ display }}
    >
      <motion.img src={src} style={{ opacity }} />
    </motion.div>
  );
};
