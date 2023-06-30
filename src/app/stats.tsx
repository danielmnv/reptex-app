import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Section } from "./section";
import { getSocialMediaIcon } from "./social-media-item";

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);

  const slider = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(slider.scrollYProgress, [0, 1], [1000, -1000]);

  return (
    <div ref={ref} className="relative h-[300vh] md:h-[300vh]">
      <div className="w-screen sticky top-0">
        <Section
          title="Stats"
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde cupiditate in natus libero facilis quaerat vitae accusamus quibusdam eum architecto, deserunt id minus. Impedit, asperiores excepturi numquam error repudiandae obcaecati."
          className="!my-0"
        >
          <div className="overflow-hidden max-w-full md:mt-20 md:py-5">
            <motion.div className="flex gap-7 md:gap-20 w-max" style={{ x }}>
              <div className="w-full">
                <div className="ds-stats shadow">
                  <div className="ds-stat">
                    <div className="ds-stat-figure text-primary">
                      <FontAwesomeIcon
                        icon={getSocialMediaIcon("Facebook")}
                        size="2x"
                      />
                    </div>
                    <div className="ds-stat-title">Total Likes</div>
                    <div className="ds-stat-value text-primary">25.6K</div>
                    <div className="ds-stat-desc">21% more than last month</div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="ds-stats shadow">
                  <div className="ds-stat">
                    <div className="ds-stat-figure text-pink-600">
                      <FontAwesomeIcon
                        icon={getSocialMediaIcon("Instagram")}
                        size="2x"
                      />
                    </div>
                    <div className="ds-stat-title">Followers</div>
                    <div className="ds-stat-value text-pink-600">2.6M</div>
                    <div className="ds-stat-desc">21% more than last month</div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="ds-stats shadow">
                  <div className="ds-stat">
                    <div className="ds-stat-figure text-yellow-500">
                      <FontAwesomeIcon
                        icon={getSocialMediaIcon("Mercado Libre")}
                        size="2x"
                      />
                    </div>
                    <div className="ds-stat-value text-yellow-500">86%</div>
                    <div className="ds-stat-title">Orders</div>
                    <div className="ds-stat-desc">Number of products</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
};
