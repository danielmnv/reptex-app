import "./styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import styles from "./layout.module.css";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { loadSocialMedia } from "../lib/social-media";
import { loadFooterNavigation, loadHeaderNavigation } from "../lib/navigation";
import { Chat } from "./chat";
import { loadStores } from "../lib/stores";
import { ScrollToTop } from "./scroll-to-top";
import { ResponsiveContextProvider } from "../context/responsive.context";

config.autoAddCss = false;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stores = await loadStores();
  const socialMedia = await loadSocialMedia();
  const headerNavigation = await loadHeaderNavigation();
  const footerNavigation = await loadFooterNavigation();

  return (
    <html lang="es">
      <head></head>
      <body>
        <ResponsiveContextProvider>
          <Navbar navigation={headerNavigation}>
            <main className={styles.mainWrapper}>
              {children}
              <ScrollToTop />
            </main>
          </Navbar>
          <Footer
            navigation={footerNavigation}
            socialMedia={socialMedia}
            stores={stores}
          />
        </ResponsiveContextProvider>
      </body>
    </html>
  );
}
