import React from "react";
import { notFound } from "next/navigation";
import { loadCategory } from "../../../lib/category";
import { loadProduct } from "../../../lib/product";
import { CategoryView } from "./category";
import { ProductView } from "./product";

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
  params: { keyword: string[] };
}) {
  try {
    if (params.keyword.length > 2) {
      notFound();
    }

    if (params.keyword.length === 1) {
      const category = await loadCategory(params.keyword[0]);
      return <CategoryView category={category} />;
    }

    const product = await loadProduct(params.keyword[1], params.keyword[0]);
    return <ProductView product={product} />;
  } catch (error) {
    notFound();
  }
}
