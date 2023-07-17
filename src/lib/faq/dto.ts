import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const FaqConverter = {
  toFirestore(group: FaqGroup): DocumentData {
    return group;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<FaqGroup>): FaqGroup {
    const data = snapshot.data()!;

    return {
      ...data,
    };
  },
};

export type FaqGroup = {
  name: string;
  items: FaqItem[];
  order: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};
