import { db } from "../index";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FaqConverter, FaqGroup } from "./dto";

const list = collection(db, "faq").withConverter(FaqConverter);

export const loadFaqs = async (): Promise<FaqGroup[]> => {
  const snapshot = await getDocs(query(list, orderBy("order")));
  return snapshot.docs.map((store) => store.data());
};
