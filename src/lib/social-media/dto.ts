import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const SocialMediaConverter = {
  toFirestore(socialMedia: SocialMedia): DocumentData {
    return socialMedia;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<SocialMediaRow>): SocialMedia {
    const data = snapshot.data()!;

    return {
      ...data,
      id: snapshot.id,
    };
  },
};

export type SocialMediaType =
  | "Facebook"
  | "Instagram"
  | "TikTok"
  | "Mercado Libre"
  | "WhatsApp"
  | "Messenger";

export type SocialMediaRow = {
  label: SocialMediaType;
  link: string;
  order: number;
};

export type SocialMedia = {
  id: string;
  label: SocialMediaType;
  link: string;
  order: number;
};
