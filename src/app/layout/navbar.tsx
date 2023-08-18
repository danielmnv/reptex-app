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
  RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "./navbar.module.css";
import { HeaderLink } from "../../lib/navigation/dto";
import { ResponsiveContext } from "../../context/responsive.context";
import { getCategoryIcon } from "../../lib/category/dto";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { Loader } from "../components/loader";
import { useLoader } from "../../hooks/use-loader";

export const Navbar = ({
  navigation,
  children,
}: PropsWithChildren<{ navigation: HeaderLink[] }>) => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const isLoading = useLoader((state) => state.isLoading);
  const isTabletOrMobile = useTabletOrMobileQuery();

  const ref = useRef<HTMLDivElement>(null);
  const [isScrolled, setScrolled] = useState<boolean>();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

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
        <input
          id="my-drawer-3"
          type="checkbox"
          className="ds-drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => setDrawerOpen((prev) => !prev)}
        />
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
                <FontAwesomeIcon
                  icon={faBars}
                  size="xl"
                  className="text-accent-focus"
                />
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
            {!isTabletOrMobile && (
              <div className="ml-3">
                <Link
                  href="/contacto"
                  className="ds-btn ds-btn-primary ds-btn-md"
                >
                  <div className="flex gap-2">
                    Contactanos
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </div>
                </Link>
              </div>
            )}

            <div id="navbar-portal"></div>
          </nav>
          {/* Page content here */}
          {isLoading && <Loader isOverlay />}
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
            toggleDrawer={setDrawerOpen}
          />
        </div>
      </header>
    </>
  );
};

const Navigation = ({
  links,
  isMobile,
  toggleDrawer,
  depth = 1,
  ...props
}: HTMLAttributes<HTMLUListElement> & {
  links: HeaderLink[];
  isMobile: boolean;
  toggleDrawer?: (t: boolean) => void;
  depth?: number;
}) => {
  return (
    <ul {...props}>
      {links.map((link, index) => (
        <MenuLink
          key={`navigation-item-${index}`}
          link={link}
          isMobile={isMobile}
          depth={depth}
          toggleDrawer={toggleDrawer}
        />
      ))}

      {isMobile && depth === 1 && (
        <>
          <div className="flex-grow"></div>

          <Link
            href="/contacto"
            className="ds-btn ds-btn-primary ds-btn-block capitalize"
            onClick={() => toggleDrawer?.(false)}
          >
            Contactanos
            <FontAwesomeIcon icon={faArrowRightLong} />
          </Link>
        </>
      )}
    </ul>
  );
};

const MenuLink = ({
  link,
  isMobile,
  depth,
  toggleDrawer,
}: {
  link: HeaderLink;
  isMobile: boolean;
  depth: number;
  toggleDrawer?: (t: boolean) => void;
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const fallback = (e: any) => {
    e.preventDefault();
  };

  useOnClickOutside(ref, () => !isMobile && setOpen(false));

  return (
    <li>
      {link.childs?.length ? (
        <details open={isOpen} onClick={fallback}>
          <summary
            ref={ref}
            className="font-light"
            onClick={() => setOpen((prev) => !prev)}
          >
            {link.label}
          </summary>

          <Navigation
            links={link.childs}
            isMobile={isMobile}
            depth={depth + 1}
            toggleDrawer={toggleDrawer}
          />
        </details>
      ) : link.redirect ? (
        <Link
          href={link.url}
          className="font-light"
          onClick={() => toggleDrawer?.(false)}
        >
          {!!link.icon && (
            <FontAwesomeIcon
              icon={getCategoryIcon(link.icon)}
              className="text-accent-focus"
            />
          )}
          {link.label}
        </Link>
      ) : (
        <span className="font-light">{link.label}</span>
      )}
    </li>
  );
};
