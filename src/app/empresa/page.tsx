import React from "react";
import { Company } from "./company";

export const metadata = {
  title: "Empresa | Reptex",
  description: "Acerca de nosotros.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return <Company />;
}
