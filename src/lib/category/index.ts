import { db } from "../index";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Category, CategoryConverter } from "./dto";

export const loadCategory = async (keyword: string): Promise<Category> => {
  const docRef = doc(db, "categories", keyword).withConverter(
    CategoryConverter
  );
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Category ${keyword} not found`);
  }

  return docSnap.data()!;
};
