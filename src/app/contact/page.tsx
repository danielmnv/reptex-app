import Head from "next/head";
import React, { use } from "react";
import { loadStores } from "../../lib/stores";

import Stores from "./stores";

export const metadata = {
  title: "Contacto",
  description: "Contacto",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Page() {
  const stores = use(loadStores());

  return <Stores stores={stores} />;
}
