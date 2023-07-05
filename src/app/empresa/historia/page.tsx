import React from "react";
import { History } from "./history";

export const metadata = {
  title: "Historia",
  description: "Historia",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return <History />;
}
