import React from "react";
import { notFound } from "next/navigation";
import { loadCategory } from "../../../lib/category";
import { CategoryView } from "./category";
import {
  countCategoryProducts,
  loadCategoryProducts,
} from "../../../lib/product";

export const metadata = {
  title: "Contacto",
  description: "Contacto",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page({
  params,
}: {
  params: { keyword: string };
}) {
  try {
    const category = await loadCategory(params.keyword);

    return <CategoryView category={category} />;
  } catch (error) {
    notFound();
  }
}
