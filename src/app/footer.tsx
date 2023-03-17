"use client";

import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "../lib/navigation/dto";
import { SocialMedia } from "../lib/social-media/dto";
import { SocialMediaItem } from "./social-media-item";

export const Footer = ({
  navigation,
  socialMedia,
}: {
  navigation: FooterSection[];
  socialMedia: SocialMedia[];
}) => {
  return (
    <>
      <footer className="ds-footer p-10 bg-base-200 text-base-content">
        <div>
          <Image
            width={340}
            height={100}
            src="/img/logo-extended.png"
            alt="REPTEX"
          />
          <p>
            Distribuidores de máquinas de coser desde 2003 <br />
          </p>
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
      </footer>
      <footer className="ds-footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-row md:grid-flow-col">
          <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-2">
            {socialMedia.map((s) => (
              <SocialMediaItem
                className="social-media-link"
                key={s.label}
                item={s}
                size="xl"
              />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};
