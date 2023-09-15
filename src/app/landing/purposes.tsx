import {
  faHandHoldingHeart,
  faLaptopCode,
  faTruckBolt,
  faWandMagicSparkles,
} from "@fortawesome/pro-duotone-svg-icons";
import { Fragment } from "react";
import { Section } from "../components/section";
import { TopCard } from "../components/top-card";

export const Purposes = () => {
  const functionalities = [
    {
      title: "Colaboramos con los Mejores",
      desc: "Trabajamos en estrecha colaboración con algunas de las marcas textiles más destacadas a nivel internacional.",
      icon: faWandMagicSparkles,
    },
    {
      title: " Calidad y Confianza",
      desc: "La calidad es nuestra máxima prioridad. Trabajamos con marcas reconocidas y estamos comprometidos con la entrega de productos textiles que cumplan con los estándares más exigentes.",
      icon: faTruckBolt,
    },
    {
      title: "Innovación Constante",
      desc: "Mantenemos un dedo en el pulso de la industria textil, incorporando nuevas tendencias y tecnologías a nuestro catálogo para brindar a nuestros clientes oportunidades de vanguardia.",
      icon: faHandHoldingHeart,
    },
  ];

  return (
    <Section
      className="bg-gradient-to-b from-base-100 to-[#f7f7f7] rounded-tl-[100px]"
      preTitle={<h2 className="text-xl text-center">Qué Hacemos</h2>}
      title="Nos enorgullece ser líderes en el apasionante mundo de las representaciones textiles."
      text="Nuestra misión es conectar y brindar valor tanto a los diseñadores y fabricantes de textiles como a nuestros clientes, creando un puente entre la creatividad y la calidad."
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
