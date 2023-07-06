import React from "react";
import { Company } from "./company";

export const metadata = {
  title: "Empresa",
  description: "Empresa",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return <Company />;
}
