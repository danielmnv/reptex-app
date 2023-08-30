"use client";

import { motion, useInView } from "framer-motion";
import { useContext, useRef } from "react";
import { ResponsiveContext } from "../../../context/responsive.context";
import { Category } from "../../../lib/category/dto";
import { GridSection } from "../../components/section";
import { ProductList } from "../../components/list";

export const CategoryView = ({ category }: { category: Category }) => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);

  const isTabletOrMobile = useTabletOrMobileQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const isContainerInView = useInView(containerRef, { once: true });

  return (
    <>
      <GridSection
        className="bg-primary-content mt-0 pt-36 rounded-br-[100px]"
        title={category.name}
        icon={category.icon}
        text={category.description}
        reverse
      >
        <motion.div
          ref={containerRef}
          className="aspect-square h-auto flex items-center justify-center"
          style={{
            transform: isContainerInView
              ? "none"
              : isTabletOrMobile
              ? "scale(0)"
              : "translateX(150px)",
            opacity: isContainerInView ? 1 : 0,
            transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
          }}
        >
          <img className="rounded-lg" src={category.image} />
        </motion.div>
      </GridSection>

      <ProductList category={category} />
    </>
  );
};
