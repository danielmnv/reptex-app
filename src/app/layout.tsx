import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import Navbar from "./navbar";
import Footer from "./footer";

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head></head>
      <body>
        <Navbar>
          <main className="main-wrapper">{children}</main>
        </Navbar>
        <Footer />
      </body>
    </html>
  );
}
