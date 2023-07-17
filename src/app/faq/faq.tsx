"use client";

import { faMinus, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { FaqGroup, FaqItem } from "../../lib/faq/dto";
import { Section } from "../components/section";

export const FAQContainer = ({ faqs }: { faqs: FaqGroup[] }) => {
  return (
    <Section title="Preguntas Frecuentes" className="bg-[#f7f7f7] h-full">
      <div className="grid grid-cols-1 gap-32">
        {faqs.map((group, index) => (
          <FAQGroup key={`faq-group-${index}`} group={group} />
        ))}
      </div>
    </Section>
  );
};

const FAQGroup = ({ group }: { group: FaqGroup }) => {
  return (
    <div>
      <h2 className="text-slate-600 text-2xl font-semibold mb-6">
        {group.name}
      </h2>
      <div className="flex flex-col gap-y-4 w-full">
        {group.items.map((item, index) => (
          <FAQItem key={`faq-group-item-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ item }: { item: FaqItem }) => {
  const [checked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="ds-collapse border border-base-300 border-l-secondary border-l-2 rounded-l-none rounded-r-md">
      <input
        type="checkbox"
        className="peer"
        checked={checked}
        onClick={({ target }) => setIsChecked((prev) => !prev)}
      />

      <div className="ds-collapse-title !pr-4 flex gap-x-10 items-center justify-between">
        <span
          className={classNames("text-xl font-light", {
            "text-primary": checked,
          })}
        >
          {item.question}
        </span>

        <button
          className={classNames(
            "ds-btn ds-btn-circle ds-btn-primary ds-btn-sm",
            {
              "ds-btn-outline": checked,
            }
          )}
        >
          <FontAwesomeIcon icon={checked ? faMinus : faPlus} />
        </button>
      </div>

      <div className="ds-collapse-content">
        <div className="ds-divider"></div>
        <p className="font-extralight">{item.answer}</p>
      </div>
    </div>
  );
};
