import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { GridSection } from "../components/section";

export const Experience = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const isImageInView = useInView(imageRef, { once: true });
  const isBackgroundInView = useInView(backgroundRef, { once: true });

  return (
    <GridSection
      className="bg-primary rounded-tr-[100px] text-base-100"
      preTitle={
        <h4 className="text-xl uppercase font-semibold">Duis at quam</h4>
      }
      title="Morbi eu imperdiet quam vestibulum"
      titleClass="text-slate-300"
      text="Donec elit enim, fermentum non ornare scelerisque, mattis non justo. Curabitur mattis, sapien id pretium faucibus, nulla elit dictum lorem, eu venenatis sapien mauris eget."
      extra={
        <Link
          href="/empresa"
          className="ds-btn ds-btn-neutral ds-btn-block md:ds-btn-wide"
        >
          Curabitur vitae
        </Link>
      }
    >
      <div className="relative px-6 md:px-0">
        <motion.img
          src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/146877236/original/4a0bad3c34aace973d55884d135c8fe22f2cabe4/create-a-custom-minimalist-portrait.jpg"
          alt=""
          className="w-full h-auto md:max-h-[430px] md:w-auto rounded-lg md:ml-6 md:mt-6 z-10 relative shadow-xl"
          ref={imageRef}
          style={{
            scale: isImageInView ? 1 : 0,
            opacity: isImageInView ? 1 : 0,
            transformOrigin: "top left",
            transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
          }}
        />
        <motion.div
          className="absolute -top-3 left-3 md:top-0 md:left-0 bg-base-100 rounded-lg w-20 h-20 sm:w-5/6 sm:h-5/6"
          ref={backgroundRef}
          style={{
            scale: isBackgroundInView ? 1 : 0,
            opacity: isBackgroundInView ? 1 : 0,
            transformOrigin: "top left",
            transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
          }}
        ></motion.div>
      </div>
    </GridSection>
  );
};
