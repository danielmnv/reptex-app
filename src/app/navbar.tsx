"use client";

import {
  faArrowRightLong,
  faBars,
  faChevronDown,
  faChevronRight,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState, HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { HeaderLink } from "../lib/navigation/dto";

export const Navbar = ({ navigation }: { navigation: HeaderLink[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [isScrolled, setScrolled] = useState<boolean>();

  // Callbacks
  const isSticky = () => {
    const offset =
      (ref.current?.offsetTop || 0) + (ref.current?.clientHeight || 0);
    setScrolled(window.scrollY >= offset);
  };

  // Hooks
  useEffect(() => {
    // Set initial height of the navbar
    setHeight(ref.current?.clientHeight || 0);

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
      <header
        ref={ref}
        className={classNames("rp-navbar", { "is-sticky": isScrolled })}
      >
        <div className="ds-navbar-start">
          {/* Mobile menu */}
          <div className="ds-dropdown">
            <label tabIndex={0} className="ds-btn ds-btn-ghost lg:hidden">
              <FontAwesomeIcon icon={faBars} size="xl" />
            </label>
            <Navigation
              tabIndex={0}
              className="ds-menu ds-menu-compact ds-dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              links={navigation}
              isMobile={true}
            />
          </div>

          {/* Logo */}
          <Link href="/" className="flex px-2 mx-2">
            <div className="image">
              <Image
                width={100}
                height={100}
                src="/img/logo.png"
                alt="REPTEX"
              />
            </div>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="ds-navbar-center hidden lg:flex">
          <Navigation
            className="ds-menu ds-menu-horizontal z-[100]"
            links={navigation}
            isMobile={false}
          />
        </div>

        {/* Action */}
        <div className="ds-navbar-end">
          <Link
            href="/contact"
            className="ds-btn ds-btn-ghost md:ds-btn-primary ds-btn-sm md:ds-btn-md"
          >
            <div className="hidden md:flex gap-2">
              Contactanos
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
            <span className="md:hidden">
              <FontAwesomeIcon icon={faPhone} />
            </span>
          </Link>
        </div>
      </header>

      <div
        className={classNames("bg-transparent", { hidden: !isScrolled })}
        style={{ height: `${height}px` }}
      ></div>
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
        <MenuLink key={index} link={link} isMobile={isMobile} />
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
  const hasChildren = (link.childs?.length || 0) > 0;

  return (
    <li>
      {link.redirect ? (
        <Link
          className={classNames({ "justify-between": isMobile && hasChildren })}
          href={link.url}
        >
          {link.label}
          {hasChildren && (
            <FontAwesomeIcon icon={isMobile ? faChevronRight : faChevronDown} />
          )}
        </Link>
      ) : (
        <span
          className={classNames({ "justify-between": isMobile && hasChildren })}
        >
          {link.label}
          {hasChildren && (
            <FontAwesomeIcon icon={isMobile ? faChevronRight : faChevronDown} />
          )}
        </span>
      )}
      {link.childs?.length && (
        <Navigation
          className="p-2 bg-base-100 md:shadow-md"
          links={link.childs}
          isMobile={isMobile}
        />
      )}
    </li>
  );
};
