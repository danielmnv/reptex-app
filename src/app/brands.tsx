import classNames from "classnames";
import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject, useContext, useRef } from "react";
import { ResponsiveContext } from "../context/responsive.context";
import { Section } from "./section";
import { IconNames, SVGItem } from "./svg-item";

export const Brands = () => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

  const ref = useRef<HTMLDivElement>(null);

  const logos: ({ icon: IconNames; start: number } | null)[] = [
    { icon: "Brother", start: isMobile ? 0.05 : 0 },
    { icon: "Schmetz", start: isMobile ? 0 : 0.05 },
    { icon: "Dinnek", start: 0.1 },
    { icon: "Juki", start: 0.15 },
    { icon: "Janome", start: 0.2 },
    { icon: "Jin", start: 0.25 },
    { icon: "SilverStar", start: 0.3 },
    null,
    { icon: "GrozBeckert", start: 0.35 },
  ];

  return (
    <Section
      title="Brands"
      text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia dolores laudantium, repudiandae, accusamus, iusto a eius facilis culpa sunt itaque repellat. Ipsam cupiditate, accusantium corrupti modi dolorem perferendis voluptates illo."
    >
      <div ref={ref} className="w-full flex items-center justify-center pt-10">
        <div className="grid max-w-sm grid-cols-1 gap-4 md:px-10 sm:max-w-none sm:grid-cols-3 sm:gap-12 xl:px-6 sm:[&>*:nth-child(3n-2)]:-translate-y-[calc(50%+3rem/2)] sm:[&>*:nth-child(3n)]:-translate-y-[calc(50%+3rem/2)]">
          {logos.map((logo, index) =>
            !logo ? (
              <div
                key={`logo-${index}-ghost`}
                className="hidden sm:inline"
              ></div>
            ) : (
              <div
                key={`logo-${index}-${logo.icon}`}
                className={classNames({
                  "order-first md:order-none": logo.icon === "Schmetz",
                })}
              >
                <BrandIcon icon={logo.icon} start={logo.start} parent={ref} />
              </div>
            )
          )}
          <div></div>
        </div>
      </div>
    </Section>
  );
};

const BrandIcon = ({
  icon,
  start,
  parent,
}: {
  icon: IconNames;
  start: number;
  parent: RefObject<HTMLDivElement>;
}) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();
  const until = start + (!isMobile ? 0.1 : 0.25);

  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: parent,
    offset: ["start end", "end start"],
    smooth: 100,
  });

  const opacity = useTransform(scrollYProgress, [start, until], [0, 1]);
  const scale = useTransform(
    scrollYProgress,
    [start, until],
    [isMobile ? 0 : 1, 1]
  );

  return (
    <div className="md:min-h-16 flex items-center justify-center">
      <motion.div style={{ opacity, scale }}>
        <SVGItem
          icon={icon}
          title={icon}
          className={classNames("w-full", {
            xlarge: icon !== "Schmetz",
            medium: icon === "Schmetz",
          })}
        ></SVGItem>
      </motion.div>
    </div>
  );
};
