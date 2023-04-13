import { db } from "../index";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  FooterSection,
  FooterSectionConverter,
  HeaderLink,
  HeaderLinkConverter,
} from "./dto";

const header = collection(db, "navigation").withConverter(HeaderLinkConverter);
const footer = collection(db, "footer").withConverter(FooterSectionConverter);

export const loadHeaderNavigation = async (): Promise<HeaderLink[]> => {
  const snapshot = await getDocs(header);
  return snapshot.docs.map((doc) => doc.data());
};

export const loadFooterNavigation = async (): Promise<FooterSection[]> => {
  const snapshot = await getDocs(query(footer, orderBy("order")));
  return snapshot.docs.map((doc) => doc.data());
};
