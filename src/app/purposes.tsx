import { faLaptopCode } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "./section";

export const Purposes = () => {
  const functionalities = [
    {
      title: "Vestibulum pretium libero",
      desc: "Aliquam feugiat lorem nec velit commodo, nec fringilla ante consequat.",
    },
    {
      title: "Sed fringilla ante vel",
      desc: "Integer ultricies nibh lobortis, pharetra diam non, faucibus purus.",
    },
    {
      title: "Provident cupiditate",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptatem nam ut a? Modi velit.",
    },
  ];

  return (
    <Section
      className="bg-gradient-to-b from-base-100 to-[#f7f7f7] rounded-tl-[100px]"
      preTitle={<h2 className="text-xl text-center">What we do</h2>}
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat at arcu vitae sodales."
      text="Mauris dapibus lacus enim, quis suscipit lacus scelerisque eget. Cras quis molestie magna, in tempor justo. Nunc et orci quis nibh ornare maximus. Aliquam volutpat facilisis dictum. Suspendisse tellus nulla."
    >
      <motion.div className="grid grid-cols-1 justify-items-center md:grid-cols-3 gap-y-10 md:gap-x-6">
        {functionalities.map(({ title, desc }, index) => (
          <Fragment key={`functionality-${index}`}>
            <PurposeCard title={title} desc={desc} />
          </Fragment>
        ))}
      </motion.div>
    </Section>
  );
};

const PurposeCard = ({ title, desc }: { title: string; desc: string }) => {
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
      className="w-5/6 md:w-full self-stretch p-8 flex flex-col items-center gap-y-3 ds-card bg-[#ffffff]"
    >
      <FontAwesomeIcon icon={faLaptopCode} className="text-primary" size="2x" />
      <h3 className="text-lg text-center font-semibold">{title}</h3>
      <p className="font-thin text-center">{desc}</p>
    </motion.div>
  );
};
