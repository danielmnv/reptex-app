import { faQuoteLeft } from "@fortawesome/pro-duotone-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { Section } from "../components/section";

type Review = {
  initials: string;
  name: string;
  content: string;
  rating: number;
};

type CardReviewProps = Review & {
  type: "neutral" | "primary" | "secondary";
};

export const Reviews = () => {
  const reviews: Review[] = [
    {
      initials: "JD",
      name: "John Doe",
      content:
        "Donec ullamcorper gravida diam, eget feugiat magna tincidunt sit amet. Sed ultrices semper quam, eu. ",
      rating: 4,
    },
    {
      initials: "SH",
      name: "Sarah Hope",
      content:
        "Nunc condimentum erat non lacinia viverra. Aenean sed dolor molestie, ornare libero in, feugiat turpis. Etiam hendrerit ante lacus. In turpis nunc, vestibulum in imperdiet vitae, egestas a nunc. Praesent tempus nibh eget quam rutrum, a bibendum velit suscipit. Donec placerat risus odio. Quisque facilisis.",
      rating: 5,
    },
    {
      initials: "NM",
      name: "Nayeli Meztli",
      content:
        "Maecenas sed ullamcorper nulla, congue volutpat sapien. Quisque dignissim cursus. ",
      rating: 4,
    },
    {
      initials: "BR",
      name: "Bozhidar Ravi",
      content:
        "Pellentesque ultricies enim et orci ultrices, scelerisque pellentesque odio pellentesque. Vestibulum placerat molestie mollis. Vestibulum fermentum, sem id commodo iaculis, leo dui semper tellus, id. ",
      rating: 4,
    },
    {
      initials: "NB",
      name: "Nicole Brooks",
      content:
        "Suspendisse dignissim pulvinar nulla, ut pretium lacus aliquam cursus. Pellentesque sit amet sodales eros. Aenean congue aliquet mauris, ut accumsan elit ullamcorper sed. Suspendisse commodo hendrerit nisi at vulputate. Duis. ",
      rating: 4,
    },
    {
      initials: "GM",
      name: "Gowad Motke",
      content:
        "Morbi tincidunt facilisis nisi, nec elementum lectus elementum. ",
      rating: 4,
    },
    {
      initials: "KM",
      name: "Killa Mistawasis",
      content:
        "Pellentesque non massa et felis suscipit viverra. Nulla hendrerit posuere orci. Integer mollis nec metus quis. ",
      rating: 5,
    },
    {
      initials: "CW",
      name: "Calfuray Wayna",
      content:
        "Donec faucibus facilisis mauris non faucibus. Proin tempus justo vel mi consequat porta vitae vel quam. Sed vitae sollicitudin odio. ",
      rating: 4,
    },
    {
      initials: "PP",
      name: "Peter Parker",
      content:
        "Aenean congue aliquet mauris, ut accumsan elit ullamcorper sed. Suspendisse commodo hendrerit nisi at vulputate. Duis. ",
      rating: 5,
    },
  ];

  return (
    <Section
      className="bg-secondary-content rounded-tl-[100px]"
      title="Maecenas tellus purus, faucibus vel quam"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque nibh, maximus quis aliquam, egestas vel urna. Sed blandit. "
    >
      <div className="masonry md:masonry-md lg:masonry-lg gap-6">
        {reviews.map((review, index) => {
          const random = Math.floor(Math.random() * 3);

          return (
            <Fragment key={`card-${index}-review`}>
              <CardReview
                {...{
                  ...review,
                  type:
                    random === 0
                      ? "neutral"
                      : random === 1
                      ? "primary"
                      : "secondary",
                }}
              />
            </Fragment>
          );
        })}
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
