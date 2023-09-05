import { faQuoteLeft } from "@fortawesome/pro-duotone-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { getStaticReviews, Review } from "../../lib/review/dto";
import { Section } from "../components/section";

type CardReviewProps = Review & {
  type: "neutral" | "primary" | "secondary";
};

export const Reviews = () => {
  const reviews: CardReviewProps[] = getStaticReviews();

  return (
    <Section
      className="bg-secondary-content rounded-tl-[100px]"
      title="Razones para Elegirnos"
      text="La preferencia de nuestros clientes es nuestro mayor logro. Nuestra dedicación a la excelencia, la calidad y la satisfacción del cliente es el pilar de nuestro éxito. Sus experiencias reflejan nuestro compromiso con la confiabilidad y la atención personalizada."
    >
      <div className="masonry md:masonry-md lg:masonry-lg gap-6">
        {reviews.map((review, index) => (
          <Fragment key={`card-${index}-review`}>
            <CardReview {...review} />
          </Fragment>
        ))}
      </div>
    </Section>
  );
};

const CardReview = ({
  initials,
  name,
  content,
  rating,
  type,
}: CardReviewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  return (
    <div
      ref={ref}
      className={classNames("ds-card w-full break-inside mb-6", {
        "bg-base-100": type === "neutral",
        "bg-neutral": type === "primary",
        "bg-accent": type === "secondary",
      })}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateY(100px)",
        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
      }}
    >
      <div
        className={classNames("ds-card-body", {
          "text-base-200": type === "primary",
          "text-base-100": type === "secondary",
        })}
      >
        <div className="flex justify-between">
          <FontAwesomeIcon icon={faQuoteLeft} size="xl" />

          <div className="flex items-center gap-1">
            <span className="font-semibold">{rating}</span>
            <FontAwesomeIcon icon={faStar} className="!text-yellow-400" />
          </div>
        </div>

        <p className="pt-4 font-light">{content}</p>

        <div
          className={classNames("ds-divider", {
            "before:bg-base-300 after:bg-base-300": type === "primary",
            "before:bg-neutral-content after:bg-neutral-content":
              type === "secondary",
          })}
        ></div>

        <div className="ds-card-actions">
          <div className="flex items-center gap-x-4">
            <div className="ds-avatar ds-placeholder">
              <div
                className={classNames(
                  "text-neutral-content rounded-full w-10 bg-opacity-60",
                  {
                    "bg-neutral-focus": type === "neutral",
                    "bg-neutral-content": type === "primary",
                    "bg-base-300": type === "secondary",
                  }
                )}
              >
                <span
                  className={classNames("font-semibold", {
                    "text-neutra-contentl": type === "primary",
                    "text-neutral-focus": type === "secondary",
                  })}
                >
                  {initials}
                </span>
              </div>
            </div>

            <span className="font-semibold">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
