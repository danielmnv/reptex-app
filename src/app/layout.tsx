import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { use } from "react";
import { loadSocialMedia } from "../lib/social-media";
import { loadFooterNavigation, loadHeaderNavigation } from "../lib/navigation";

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socialMedia = use(loadSocialMedia());
  const headerNavigation = use(loadHeaderNavigation());
  const footerNavigation = use(loadFooterNavigation());

  return (
    <html lang="es">
      <head></head>
      <body>
        <Navbar navigation={headerNavigation} />
        <main className="main-wrapper">{children}</main>
        <Footer navigation={footerNavigation} socialMedia={socialMedia} />
      </body>
    </html>
  );
}
