import { db } from "../index";
import { collection, getDocs } from "firebase/firestore";
import { Store, StoreConverter } from "./dto";

const list = collection(db, "stores").withConverter(StoreConverter);

export const loadStores = async (): Promise<Store[]> => {
  const snapshot = await getDocs(list);
  return snapshot.docs.map((store) => store.data());
};
