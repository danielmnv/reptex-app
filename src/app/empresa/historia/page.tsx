import React from "react";
import { History } from "./history";

export const metadata = {
  title: "Historia | Reptex",
  description: "Descubre la grandiosa historia de la empresa Reptex.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return <History />;
}
