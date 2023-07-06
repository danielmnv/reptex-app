"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faTruckRampBox,
  faReel,
  faPuzzlePiece,
  faSlotMachine,
  faThoughtBubble,
  faEyeLowVision,
  faLightbulb,
  faWarehouse,
  faTabletScreenButton,
  faStapler,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Fragment, useContext, useRef } from "react";
import { ResponsiveContext } from "../../context/responsive.context";
import { GridSection, Section } from "../components/section";
import { TopCard } from "../components/top-card";

export const Company = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const isImageInView = useInView(imageRef, { once: true });
  const isBackgroundInView = useInView(backgroundRef, { once: true });

  const items = [
    {
      text: "Nunc purus ligula, dapibus luctus lorem quis, pretium volutpat leo.",
      icon: faTruckRampBox,
    },
    {
      text: "Duis quis erat sollicitudin nisi accumsan eleifend. Morbi laoreet cursus vehicula. ",
      icon: faReel,
    },
    {
      text: "Maecenas at tortor turpis. Duis malesuada ligula augue. ",
      icon: faPuzzlePiece,
    },
    {
      text: "Vestibulum ullamcorper est fringilla, interdum libero ac, molestie ligula.",
      icon: faSlotMachine,
    },
  ];

  return (
    <div className="bg-[#f7f7f7]">
      <GridSection
        className="min-h-screen flex items-center pt-20 md:py-0 my-0"
        title="¿Quiénes somos?"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis est sapiente deleniti. Cumque eius eveniet, saepe aliquam reiciendis nihil architecto pariatur assumenda iste autem, fugit impedit quo, harum vero ut!"
        extra={
          <div className="flex flex-col gap-2">
            {items.map((item, index) => (
              <div
                key={`company-top-item-${index}`}
                className="flex items-center gap-2"
              >
                <div className="max-w-[40px] min-w-[40px] flex justify-center">
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="lg"
                    className="text-secondary-focus hover:text-neutral-focus"
                  />
                </div>
                <span className="text-sm font-extralight">{item.text}</span>
              </div>
            ))}
          </div>
        }
      >
        <div className="relative mt-8 lg:mt-0">
          <motion.div
            className="absolute w-40 h-40 bg-secondary-focus rounded-lg -top-3 -left-3 md:-top-6 md:-left-6"
            ref={backgroundRef}
            style={{
              scale: isBackgroundInView ? 1 : 0,
              opacity: isBackgroundInView ? 1 : 0,
              transformOrigin: "top left",
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          ></motion.div>
          <motion.img
            src="https://www.colelawgrouppc.com/blog/wp-content/uploads/2022/05/pexels-pixabay-269077.jpg"
            className="rounded-lg relative z-10 w-full h-auto"
            ref={imageRef}
            style={{
              scale: isImageInView ? 1 : 0,
              opacity: isImageInView ? 1 : 0,
              transformOrigin: "top left",
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
            }}
          />
        </div>
      </GridSection>

      <CompanyObjectives />
      <CompanyFunctionalities />
    </div>
  );
};

const CompanyObjectives = () => {
  const objectives = [
    {
      title: "Misión",
      desc: "Aliquam feugiat lorem nec velit commodo, nec fringilla ante consequat.",
      icon: faThoughtBubble,
    },
    {
      title: "Visión",
      desc: "Integer ultricies nibh lobortis, pharetra diam non, faucibus purus.",
      icon: faEyeLowVision,
    },
  ];

  return (
    <>
      <Section
        className="bg-gradient-to-b from-base-100 to-[#f7f7f7] rounded-tr-[100px]"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        text="Mauris dapibus lacus enim, quis suscipit lacus scelerisque eget. Cras quis molestie magna, in tempor justo. Nunc et orci quis nibh ornare maximus. Aliquam volutpat facilisis dictum. Suspendisse tellus nulla."
      >
        <motion.div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-y-10 md:gap-x-6">
          {objectives.map((objective, index) => (
            <Fragment key={`functionality-${index}`}>
              <TopCard {...objective} className="z-10 shadow-sm" />
            </Fragment>
          ))}
        </motion.div>
      </Section>

      <div className="w-full -mt-60 h-80 bg-primary"></div>
    </>
  );
};

const CompanyFunctionalities = () => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isTabletOrMobile = useTabletOrMobileQuery();

  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true });
  const isButtonInView = useInView(buttonRef, { once: true });

  const cardItems = [
    {
      text: "Vivamus lacus urna, ultrices ac dictum vel, blandit at ipsum.",
      icon: faLightbulb,
    },
    {
      text: "Vivamus lacus urna, ultrices ac dictum vel, blandit at ipsum.",
      icon: faWarehouse,
    },
    {
      text: "Vivamus lacus urna, ultrices ac dictum vel, blandit at ipsum.",
      icon: faTabletScreenButton,
    },
    {
      text: "Vivamus lacus urna, ultrices ac dictum vel, blandit at ipsum.",
      icon: faStapler,
    },
  ];

  return (
    <Section className="pt-0 pb-36 md:pb-60 -mt-20 mb-0 relative before:w-full before:h-1/3 before:bg-primary before:inline-block before:absolute before:-top-10 before:-skew-y-3">
      <div className="flex flex-col lg:flex-row items-end lg:justify-between gap-12 z-10 pt-60">
        <div className="order-2 lg:order-1 flex flex-col gap-12 items-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-5/6 md:w-full">
            {cardItems.map((item, index) => (
              <Fragment key={`card-bottom-company-${index}`}>
                <CompanyCard {...item} />
              </Fragment>
            ))}
          </div>

          <motion.div
            ref={buttonRef}
            className="w-5/6 md:w-full"
            style={{
              transform: !isTabletOrMobile
                ? "none"
                : isButtonInView
                ? "none"
                : "translateY(150px)",
              opacity: isButtonInView ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
            }}
          >
            <Link
              href="/empresa/historia"
              className="ds-btn ds-btn-outline ds-btn-block ds-btn-neutral"
            >
              Descubre nuestra historia
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={cardRef}
          className="order-1 lg:order-2 rounded-lg overflow-hidden bg-base-100 shadow-sm w-full"
          style={{
            transform: isCardInView
              ? "none"
              : isTabletOrMobile
              ? "scale(0)"
              : "translateX(150px)",
            opacity: isCardInView ? 1 : 0,
            transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
          }}
        >
          <img src="https://wallpaperaccess.com/full/656665.jpg" />

          <div className="relative before:w-full before:h-[120%] before:bg-accent before:inline-block before:absolute before:bottom-0 before:-skew-y-3">
            <p className="p-6 bg-accent font-light text-white tracking-wider relative z-10">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laudantium, doloribus laboriosam voluptas molestias, unde,
              dignissimos deleniti nulla dolore ab recusandae obcaecati tempore
              officia adipisci nobis impedit! Sed tenetur laudantium quasi.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

const CompanyCard = ({ text, icon }: { text: string; icon: IconProp }) => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isTabletOrMobile = useTabletOrMobileQuery();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-start gap-4"
      style={{
        transform: isInView
          ? "none"
          : isTabletOrMobile
          ? "translateY(150px)"
          : "translateX(-150px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
      }}
    >
      <div className="rounded-full aspect-square h-14 flex items-center justify-center bg-base-100 shadow-md">
        <FontAwesomeIcon icon={icon} size="lg" className="text-accent" />
      </div>

      <div className="text-slate-700 font-thin">{text}</div>
    </motion.div>
  );
};
