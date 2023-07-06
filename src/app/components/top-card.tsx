import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const TopCard = ({
  title,
  desc,
  icon,
  className,
}: {
  title: string;
  desc: string;
  icon: IconProp;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(150px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
      }}
      className={classNames(
        "w-5/6 md:w-full self-stretch p-8 flex flex-col items-center gap-y-3 ds-card bg-[#ffffff]",
        className
      )}
    >
      <FontAwesomeIcon icon={icon} className="text-primary" size="2x" />
      <h3 className="text-lg text-center font-semibold">{title}</h3>
      <p className="font-thin text-center">{desc}</p>
    </motion.div>
  );
};
