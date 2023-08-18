import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useInView, motion } from "framer-motion";
import { PropsWithChildren, ReactNode, useRef } from "react";

type ISectionProps = PropsWithChildren<
  Partial<{
    title: string;
    icon: IconDefinition;
    text: string;
    className: string;
    containerClassName: string;
    preTitle: ReactNode;
  }>
>;

type IGridSectionProps = ISectionProps & {
  titleClass?: string;
  extra?: ReactNode;
  reverse?: boolean;
};

export const Section: React.FC<ISectionProps> = ({
  preTitle,
  title,
  text,
  className,
  containerClassName,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: "some", once: true });

  return (
    <div className={classNames("section", className)}>
      <div
        ref={containerRef}
        className={classNames("container", containerClassName)}
      >
        <div className="flex flex-col gap-y-20">
          {(preTitle || title || text) && (
            <motion.div
              className="text-wrapper"
              style={{
                transform: isInView ? "none" : "translateY(150px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
              }}
            >
              {preTitle !== undefined && preTitle}
              {title && (
                <span className="text-center text-slate-600 text-4xl font-semibold">
                  {title}
                </span>
              )}
              {text && <p className="text-center font-light">{text}</p>}
            </motion.div>
          )}

          {children !== undefined && children}
        </div>
      </div>
    </div>
  );
};

export const GridSection: React.FC<IGridSectionProps> = ({
  preTitle,
  title,
  titleClass,
  text,
  extra,
  className,
  children,
  icon,
  reverse = false,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });

  return (
    <div className={classNames("section", className)} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative">
          {children}

          <motion.div
            ref={ref}
            className={classNames(
              "flex flex-col gap-y-6 px-6 md:px-0 md:max-w-md",
              { "order-first": reverse }
            )}
            style={{
              transform: isInView ? "none" : "translateY(150px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
            }}
          >
            {preTitle}

            <div className="flex gap-x-4 place-items-center">
              {!!icon && (
                <FontAwesomeIcon
                  icon={icon}
                  size="4x"
                  className="text-accent-focus"
                />
              )}

              {title && (
                <span className={classNames("text-4xl font-bold", titleClass)}>
                  {title}
                </span>
              )}
            </div>

            {text && <p className="font-extralight text-justify">{text}</p>}

            {extra}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
