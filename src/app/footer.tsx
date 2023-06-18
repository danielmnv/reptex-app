"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";
import { FooterSection } from "../lib/navigation/dto";
import { SocialMedia } from "../lib/social-media/dto";
import { getSocialMediaIcon, SocialMediaItem } from "./social-media-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = ({
  navigation,
  socialMedia,
}: {
  navigation: FooterSection[];
  socialMedia: SocialMedia[];
}) => {
  return (
    <footer className="sticky min-h-[100vh] z-[150] bg-base-200">
      <div className="bg-neutral h-[35vh] min-h-[250px] relative overflow-hidden flex">
        <div className="container grid md:grid-cols-2 gap-y-14 place-content-center z-[20]">
          <h5 className="text-base-100 text-center md:text-start text-3xl md:text-5xl tracking-wider">
            Distribuidores de máquinas de coser desde 2003
          </h5>
        </div>

        <div className="absolute -bottom-28 -right-28 -rotate-45 w-72 h-72 bg-base-100 bg-opacity-50 rounded-full blur-3xl"></div>
      </div>
      <div className="container text-accent">
        <div className="ds-footer pt-10 pb-5 place-content-center sm:place-content-stretch">
          <div>
            <Image
              width={340}
              height={100}
              src="/img/logo-extended.png"
              alt="REPTEX"
            />

            <div className="w-full pt-5">
              <div className="grid grid-flow-col gap-4 place-content-center">
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
        <div className="ds-footer border-t py-5 border-base-300 items-center !gap-y-4 place-content-center sm:place-content-between">
          <p className="inline-block text-center sm:text-start w-full">
            {/* <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}{" "} */}
            REPTEX - All rights reserved.
          </p>
          <p className="inline-block md:place-self-center md:justify-self-end text-center sm:text-start w-full">
            {/* Made with <FontAwesomeIcon icon={faHeart} /> */}
          </p>
        </div>
      </div>
    </footer>
  );
};
