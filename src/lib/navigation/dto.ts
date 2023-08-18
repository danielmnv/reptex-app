import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { CategoryIcon } from "../category/dto";

export const HeaderLinkConverter = {
  toFirestore(navigationLink: HeaderLink): DocumentData {
    return navigationLink;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<HeaderLink>): HeaderLink {
    return snapshot.data()!;
  },
};

export const FooterSectionConverter = {
  toFirestore(navigationLink: FooterSection): DocumentData {
    return navigationLink;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<FooterSection>): FooterSection {
    return snapshot.data()!;
  },
};

type NavigationLinkBase = {
  label: string;
  url: string;
};

type HeaderLinkBase = NavigationLinkBase & {
  redirect: boolean;
  icon?: CategoryIcon;
};

export type HeaderLink = HeaderLinkBase & {
  childs?: HeaderLink[];
};

export type FooterSection = {
  title: string;
  order: number;
  links: NavigationLinkBase[];
};
