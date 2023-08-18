import { db } from "../index";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  limitToLast,
  startAfter,
  endBefore,
  orderBy,
  getCountFromServer,
  QueryDocumentSnapshot,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import {
  CategoryProductFilters,
  PaginatedCategoryProducts,
  Product,
  ProductConverter,
} from "./dto";

const list = collection(db, "products").withConverter(ProductConverter);

export const loadCategoryProducts = async (
  category: string
): Promise<Product[]> => {
  const snapshot = await getDocs(
    query(list, where("category", "==", category.toLocaleLowerCase()))
  );
  return snapshot.docs.map((store) => store.data());
};

export const paginateCategoryProducts = async (
  category: string,
  filters: CategoryProductFilters[],
  after?: QueryDocumentSnapshot<Product, DocumentData>,
  before?: QueryDocumentSnapshot<Product, DocumentData>
): Promise<PaginatedCategoryProducts> => {
  const LIMIT = 20;

  const constraints: QueryConstraint[] = [
    orderBy("category", "asc"),
    where("category", "==", category.toLocaleLowerCase()),
    limit(LIMIT),
  ];

  if (after) {
    constraints.push(startAfter(after));
  }

  if (before) {
    constraints.push(limitToLast(LIMIT), endBefore(before));
  }

  if (filters.length) {
    let shouldOrderByName = false;

    constraints.push(
      ...filters.map(({ fieldPath, opStr, value }) => {
        if (!shouldOrderByName && fieldPath === "name") {
          shouldOrderByName = true;
        }

        return where(fieldPath, opStr, value);
      })
    );

    if (shouldOrderByName) {
      constraints.unshift(orderBy("name", "asc"));
    }
  }

  const snapshot = await getDocs(query(list, ...constraints));

  const total = await countCategoryProducts(category, filters || []);

  return {
    first: snapshot.docs[0],
    last: snapshot.docs[snapshot.docs.length - 1],
    items: snapshot.docs.map((store) => store.data()),
    lastPage: Math.ceil(total / LIMIT),
    total,
  };
};

export const countCategoryProducts = async (
  category: string,
  filters: CategoryProductFilters[]
): Promise<number> => {
  const snapshot = await getCountFromServer(
    query(
      list,
      where("category", "==", category.toLocaleLowerCase()),
      ...filters.map(({ fieldPath, opStr, value }) =>
        where(fieldPath, opStr, value)
      )
    )
  );
  return snapshot.data().count;
};
