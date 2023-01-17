import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ children }) {
  const items = [{ text: "Contacto", url: "/contact" }];
  const links = items.map((link, index) => (
    <li key={index}>
      <Link href={link.url}>{link.text}</Link>
    </li>
  ));

  return (
    <div className="ds-drawer">
      <input id="my-drawer-3" type="checkbox" className="ds-drawer-toggle" />
      <div className="ds-drawer-content flex flex-col">
        <div className="w-full ds-navbar bg-[#0D47A1] text-base-100">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              className="ds-btn ds-btn-square ds-btn-ghost"
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href="/">
              <div className="h-12 w-12 relative">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/img/logo.png"
                  alt="REPTEX"
                />
              </div>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="ds-menu ds-menu-horizontal">{links}</ul>
          </div>
        </div>
        {/* Main content */}
        {children}
      </div>

      <div className="ds-drawer-side">
        <label htmlFor="my-drawer-3" className="ds-drawer-overlay"></label>
        <ul className="ds-menu p-4 overflow-y-auto w-80 bg-base-100">
          {links}
        </ul>
      </div>
    </div>
  );
}
