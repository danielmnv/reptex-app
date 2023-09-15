import {
  DocumentData,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "firebase/firestore";

export const ProductConverter = {
  toFirestore(product: Product): DocumentData {
    return product;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<ProductRow>): Product {
    const data = snapshot.data()!;

    return {
      ...data,
      keyword: snapshot.id,
    };
  },
};

export type ProductImage = {
  src: string;
  alt?: string;
};

export type ProductRow = {
  name: string;
  description: string;
  category: string;
  properties: Record<string, string | number>;
  images: ProductImage[];
};

export type Product = {
  keyword: string;
  name: string;
  description: string;
  category: string;
  properties: Record<string, string | number>;
  images: ProductImage[];
  file?: string;
};

export type PaginatedCategoryProducts = {
  first: QueryDocumentSnapshot<Product, DocumentData>;
  last: QueryDocumentSnapshot<Product, DocumentData>;
  items: Product[];
  total: number;
  lastPage: number;
};

export type CategoryProductFilters = {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: unknown;
};
