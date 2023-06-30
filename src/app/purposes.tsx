import {
  faHandHoldingHeart,
  faLaptopCode,
  faTruckBolt,
  faWandMagicSparkles,
} from "@fortawesome/pro-duotone-svg-icons";
import { Fragment } from "react";
import { Section } from "./section";
import { TopCard } from "./top-card";

export const Purposes = () => {
  const functionalities = [
    {
      title: "Vestibulum pretium libero",
      desc: "Aliquam feugiat lorem nec velit commodo, nec fringilla ante consequat.",
      icon: faWandMagicSparkles,
    },
    {
      title: "Sed fringilla ante vel",
      desc: "Integer ultricies nibh lobortis, pharetra diam non, faucibus purus.",
      icon: faTruckBolt,
    },
    {
      title: "Provident cupiditate",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptatem nam ut a? Modi velit.",
      icon: faHandHoldingHeart,
    },
  ];

  return (
    <Section
      className="bg-gradient-to-b from-base-100 to-[#f7f7f7] rounded-tl-[100px]"
      preTitle={<h2 className="text-xl text-center">What we do</h2>}
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat at arcu vitae sodales."
      text="Mauris dapibus lacus enim, quis suscipit lacus scelerisque eget. Cras quis molestie magna, in tempor justo. Nunc et orci quis nibh ornare maximus. Aliquam volutpat facilisis dictum. Suspendisse tellus nulla."
    >
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 gap-y-10 md:gap-x-6">
        {functionalities.map((functionality, index) => (
          <Fragment key={`functionality-${index}`}>
            <TopCard {...functionality} />
          </Fragment>
        ))}
      </div>
    </Section>
  );
};
