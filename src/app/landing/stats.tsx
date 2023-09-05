import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { SocialMediaType } from "../../lib/social-media/dto";
import { Section } from "../components/section";
import { getSocialMediaIcon } from "../components/social-media-item";

type StatsSectionProps = {
  title: string;
  number: string;
  subtitle: string;
  icon: SocialMediaType;
  textClassName: string;
};

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);

  const slider = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(slider.scrollYProgress, [0, 1], [1000, -1000]);

  const stats: StatsSectionProps[] = [
    {
      title: "Me gusta",
      number: "5.9K",
      subtitle: "6.4K seguidores desde 2013",
      icon: "Facebook",
      textClassName: "text-primary",
    },
    {
      title: "Seguidores",
      number: "357",
      subtitle: "Creciendo cada dia",
      icon: "Instagram",
      textClassName: "text-pink-500",
    },
    {
      title: "Ventas",
      number: "+60",
      subtitle: "10 meses vendiendo",
      icon: "Mercado Libre",
      textClassName: "text-yellow-500",
    },
  ];

  return (
    <div ref={ref} className="relative h-[300vh] md:h-[300vh]">
      <div className="w-screen sticky top-0">
        <Section
          title="Nuestras Redes Sociales en Números"
          text="Creemos en la transparencia y en compartir el impacto que nuestras redes sociales tienen en nuestra comunidad"
          className="!my-0"
        >
          <div className="overflow-hidden max-w-full md:mt-20 md:py-5">
            <motion.div className="flex gap-7 md:gap-20 w-max" style={{ x }}>
              {stats.map((stat, index) => (
                <StatsSection
                  key={`stats-section-${index}`}
                  title={stat.title}
                  number={stat.number}
                  subtitle={stat.subtitle}
                  icon={stat.icon}
                  textClassName={stat.textClassName}
                />
              ))}
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
};

const StatsSection = ({
  title,
  number,
  subtitle,
  icon,
  textClassName,
}: StatsSectionProps) => {
  return (
    <div className="w-full">
      <div className="ds-stats shadow">
        <div className="ds-stat">
          <div className={classNames("ds-stat-figure", textClassName)}>
            <FontAwesomeIcon icon={getSocialMediaIcon(icon)} size="2x" />
          </div>
          <div className="ds-stat-title">{title}</div>
          <div className={classNames("ds-stat-value", textClassName)}>
            {number}
          </div>
          <div className="ds-stat-desc">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};
