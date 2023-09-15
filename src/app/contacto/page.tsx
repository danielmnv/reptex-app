import React from "react";
import { loadStores } from "../../lib/stores";

import Stores from "./stores";

export const metadata = {
  title: "Contacto | Reptex",
  description: "Medios de comunicación por los que puedas contactarnos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  const stores = await loadStores();

  return <Stores stores={stores} />;
}
