import React from "react";
import { loadStores } from "../../lib/stores";
import { Company } from "./company";

export const metadata = {
  title: "Empresa",
  description: "Empresa",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  const stores = await loadStores();

  return <Company />;
}
