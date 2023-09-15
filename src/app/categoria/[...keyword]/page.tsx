import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { loadCategory } from "../../../lib/category";
import { loadProduct } from "../../../lib/product";
import { CategoryView } from "./category";
import { ProductView } from "./product";

type Props = {
  params: { keyword: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let title: string = "Not found";

  try {
    if (params.keyword.length === 1) {
      const category = await loadCategory(params.keyword[0]);
      title = `${category.name} | Reptex`;
    } else {
      const product = await loadProduct(params.keyword[1], params.keyword[0]);
      title = `${product.name} | Reptex`;
    }
  } catch (error) {}

  return {
    title,
  };
}

export default async function Page({ params }: Props) {
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
