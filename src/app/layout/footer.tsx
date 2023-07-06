"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";
import { FooterSection } from "../../lib/navigation/dto";
import { SocialMedia } from "../../lib/social-media/dto";
import { SocialMediaItem } from "../components/social-media-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/pro-duotone-svg-icons";
import { SVGItem } from "../components/svg-item";
import { useContext, useRef, useState } from "react";
import { ResponsiveContext } from "../../context/responsive.context";
import { Chat } from "../components/chat";
import { Store } from "../../lib/stores/dto";

export const Footer = ({
  navigation,
  socialMedia,
  stores,
}: {
  navigation: FooterSection[];
  socialMedia: SocialMedia[];
  stores: Store[];
}) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

  const ref = useRef<HTMLElement>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const isDisabled = () => {
    return name.length === 0 || email.length === 0 || message.length === 0;
  };

  const onSubmit = () => {
    if (isDisabled()) return;

    // TODO: use emailjs and others api to send email
  };

  return (
    <>
      <Chat footerRef={ref} stores={stores} />
      <footer
        ref={ref}
        className="sticky min-h-[100vh] z-[150] flex items-center bg-neutral"
      >
        <div className="absolute top-0 w-full h-full">
          {!isMobile && <SVGItem icon="Waves" className="w-full h-auto" />}
        </div>

        <div className="container text-accent z-10">
          <div className="grid md:grid-cols-2 pt-10 pb-5">
            <div className="flex flex-col justify-start">
              <div>
                <Image
                  width={340}
                  height={100}
                  src="/img/logo-extended.png"
                  alt="REPTEX"
                />
              </div>

              <div className="ds-footer pt-10 pb-5 place-content-stretch">
                {navigation.map(({ title, links }, index) => (
                  <div key={`section-${title}-${index}`}>
                    <span className="ds-footer-title">{title}</span>
                    {links.map(({ label, url }, index) => (
                      <Link key={`link-${label}-${index}`} href={url}>
                        {label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="ds-input ds-input-ghost w-full focus:bg-opacity-20 text-white focus:text-white"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Email"
                  className="ds-input ds-input-ghost w-full focus:bg-opacity-20 text-white focus:text-white"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <textarea
                  className="ds-textarea ds-textarea-ghost w-full focus:bg-opacity-20 text-white focus:text-white resize-none"
                  placeholder="Mensaje"
                  rows={7}
                  value={message}
                  onChange={({ target }) => setMessage(target.value)}
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <button
                  className="ds-btn ds-btn-outline ds-btn-accent ds-btn-block md:w-auto"
                  onClick={onSubmit}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <div className="ds-footer border-t py-4 border-accent items-center !gap-y-4 place-content-center md:place-content-between">
            <p className="inline-block text-center md:text-start w-full">
              <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}{" "}
              REPTEX - All rights reserved.
            </p>
            <div className="w-full">
              <div className="grid grid-flow-col gap-4 place-content-center place-items-center w-full">
                {socialMedia.map((s) => (
                  <SocialMediaItem
                    className={styles.socialMediaLink}
                    key={`link-footer-social-media-${s.label}`}
                    item={s}
                    size="xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};