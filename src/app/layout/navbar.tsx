"use client";

import {
  faArrowRightLong,
  faBars,
  faEarthAmericas,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
} from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "./navbar.module.css";
import { HeaderLink } from "../../lib/navigation/dto";
import { ResponsiveContext } from "../../context/responsive.context";
import { usePathname } from "next/navigation";

export const Navbar = ({
  navigation,
  children,
}: PropsWithChildren<{ navigation: HeaderLink[] }>) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const pathname = usePathname();
  const isMobile = useMobileQuery();

  const ref = useRef<HTMLDivElement>(null);
  const [isScrolled, setScrolled] = useState<boolean>();

  // Callbacks
  const isSticky = () => {
    const offset =
      (ref.current?.offsetTop || 0) + (ref.current?.clientHeight || 0);
    setScrolled(window.scrollY >= offset);
  };

  // Hooks
  useEffect(() => {
    // First call to match inital render
    isSticky();

    // Event listener
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  return (
    <>
      <header className="ds-drawer">
        <input id="my-drawer-3" type="checkbox" className="ds-drawer-toggle" />
        <div className="ds-drawer-content flex flex-col">
          {/* Navbar */}
          <nav
            ref={ref}
            className={classNames(styles.reptexNavbar, {
              [styles.isSticky]: isScrolled,
            })}
          >
            <div className="flex-none lg:hidden">
              <label
                tabIndex={0}
                htmlFor="my-drawer-3"
                className="ds-btn ds-btn-square ds-btn-ghost"
              >
                <FontAwesomeIcon icon={faBars} size="xl" />
              </label>
            </div>
            {/* Logo */}
            <Link href="/" className="flex px-2 mx-2">
              <div className={styles.image}>
                <Image
                  width={100}
                  height={100}
                  src="/img/logo.png"
                  alt="REPTEX"
                />
              </div>
            </Link>
            <div className="flex-1"></div>
            {/* Desktop menu */}
            <div className="flex-none hidden lg:block">
              <Navigation
                className="ds-menu ds-menu-horizontal z-[100] ds-menu-lg ds-rounded-box"
                links={navigation}
                isMobile={false}
              />
            </div>

            {/* Action */}
            {(!isMobile || pathname !== "/contacto") && (
              <div className="ml-3">
                <Link
                  href="/contacto"
                  className="ds-btn ds-btn-ghost md:ds-btn-primary ds-btn-sm md:ds-btn-md"
                >
                  <div className="hidden md:flex gap-2">
                    Contactanos
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </div>
                  <span className="md:hidden">
                    <FontAwesomeIcon icon={faEarthAmericas} />
                  </span>
                </Link>
              </div>
            )}

            <div id="navbar-portal"></div>
          </nav>
          {/* Page content here */}
          {children}
        </div>

        {/* Side bar */}
        <div className="ds-drawer-side z-[160]">
          <label htmlFor="my-drawer-3" className="ds-drawer-overlay"></label>

          <Navigation
            tabIndex={0}
            className="ds-menu p-4 w-80 h-full bg-base-100"
            links={navigation}
            isMobile={true}
          />
        </div>
      </header>
    </>
  );
};

const Navigation = ({
  links,
  isMobile,
  ...props
}: HTMLAttributes<HTMLUListElement> & {
  links: HeaderLink[];
  isMobile: boolean;
}) => {
  return (
    <ul {...props}>
      {links.map((link, index) => (
        <MenuLink
          key={`navigation-item-${index}`}
          link={link}
          isMobile={isMobile}
        />
      ))}
    </ul>
  );
};

const MenuLink = ({
  link,
  isMobile,
}: {
  link: HeaderLink;
  isMobile: boolean;
}) => {
  return (
    <li>
      {link.childs?.length ? (
        <details>
          <summary className="font-light">{link.label}</summary>
          <Navigation links={link.childs} isMobile={isMobile} />
        </details>
      ) : link.redirect ? (
        <Link href={link.url} className="font-light">
          {link.label}
        </Link>
      ) : (
        <span className="font-light">{link.label}</span>
      )}
    </li>
  );
};
