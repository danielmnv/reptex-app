"use client";

import "./history.css";

import classNames from "classnames";
import {
  motion,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useContext, useEffect, useRef } from "react";
import { GridSection, Section } from "../../section";
import { ResponsiveContext } from "../../../context/responsive.context";

type TimelineItem = {
  date: string;
  title: string;
  desc: string;
};

type TimelineCardProps = TimelineItem & {
  direction: "left" | "right";
};

export const History = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const isImageInView = useInView(imageRef, { once: true });
  const isBackgroundInView = useInView(backgroundRef, { once: true });

  return (
    <div className="bg-[#f7f7f7]">
      <GridSection
        className="min-h-screen flex items-center pt-20 md:py-0 my-0"
        title="Nuestra historia"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis est sapiente deleniti. Cumque eius eveniet, saepe aliquam reiciendis nihil architecto pariatur assumenda iste autem, fugit impedit quo, harum vero ut!"
      >
        <div className="relative mt-8 lg:mt-0">
          <motion.div
            className="absolute w-40 h-40 bg-accent rounded-lg -top-3 -left-3 md:-top-6 md:-left-6"
            ref={backgroundRef}
            style={{
              scale: isBackgroundInView ? 1 : 0,
              opacity: isBackgroundInView ? 1 : 0,
              transformOrigin: "top left",
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          ></motion.div>
          <motion.img
            src="https://cdn.wallpapersafari.com/7/69/igSszX.jpg"
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

      <Timeline />
    </div>
  );
};

const Timeline = () => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target, offset: ["start", "end"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineItems: TimelineItem[] = [
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
    {
      date: "2022-03-19",
      title: "Morbi dolor risus.",
      desc: "Sed tincidunt sodales consectetur. Etiam mi dui, commodo ut porttitor sit amet, fringilla a ligula. Donec porta eros neque, eget pulvinar enim volutpat in. Nam vel lacus suscipit, ultricies enim. ",
    },
  ];

  return (
    <Section className="py-0 mb-0 bg-white rounded-tl-[100px]">
      <div ref={target} className="relative py-60 -mt-40">
        <div className="relative">
          <motion.div
            className="absolute left-0 lg:left-1/2 top-0 w-2 bg-primary rounded-full before:absolute before:content-[''] before:w-4 before:h-4 before:bg-primary before:rounded-full before:-bottom-3 before:-left-1"
            style={{ height }}
          ></motion.div>

          {timelineItems.map((item, index) => (
            <Fragment key={`timeline-item-${index}`}>
              <TimelineCard
                {...item}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
};

const TimelineCard = ({ title, date, desc, direction }: TimelineCardProps) => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isTabletOrMobile = useTabletOrMobileQuery();

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: "all" });

  useEffect(() => {
    animate(
      isInView
        ? [
            ["div.card-wrapper", { transform: "translateY(0)", opacity: 1 }],
            ["div.timeline-date", { transform: "translateX(0)", opacity: 1 }],
            [
              "div.ds-card-body",
              { opacity: 1, filter: "blur(0px)" },
              { at: "-0.1" },
            ],
          ]
        : [
            ["div.ds-card-body", { opacity: 0, filter: "blur(10px)" }],
            [
              "div.timeline-date",
              {
                transform: `translateX(${
                  direction === "right" || isTabletOrMobile ? "-" : ""
                }100px)`,
                opacity: 0,
              },
            ],
            [
              "div.card-wrapper",
              { transform: "translateY(100px)", opacity: 0 },
            ],
          ]
    );
  }, [isInView, direction]);

  return (
    <div
      ref={scope}
      className={classNames("pb-32 last:pb-0", {
        "!justify-end": direction === "right",
      })}
    >
      <div className="card-wrapper w-full flex flex-col lg:flex-row items-end lg:items-start justify-end lg:justify-between">
        <div
          className={classNames(
            "lg:pt-5 lg:inline-block w-[calc(100%_-_2rem)] sm:w-[calc(100%_-_10rem)] md:w-96 order-1 timeline-date",
            {
              "lg:order-1 lg:text-right": direction === "right",
              "lg:order-3": direction === "left",
            }
          )}
        >
          <p className="p-[length:var(--padding-card,2rem)] lg:py-0 font-extralight">
            {date}
          </p>
        </div>
        <div
          className={classNames(
            "ds-card relative order-2 w-[calc(100%_-_2rem)] sm:w-[calc(100%_-_10rem)] md:w-96",
            {
              "bg-neutral text-neutral-content": direction === "left",
              "bg-base-200 text-neutral-focus": direction === "right",
            }
          )}
        >
          <div
            className={classNames("card-arrow", {
              "card-left": direction === "left",
            })}
          ></div>
          <div className="ds-card-body">
            <h2 className="ds-card-title">{title}</h2>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
