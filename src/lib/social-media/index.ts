import { db } from "../index";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { SocialMedia, SocialMediaConverter } from "./dto";

const list = collection(db, "socialMedia").withConverter(SocialMediaConverter);

export const loadSocialMedia = async (): Promise<SocialMedia[]> => {
  const snapshot = await getDocs(query(list, orderBy("order")));
  return snapshot.docs.map((doc) => doc.data());
};
