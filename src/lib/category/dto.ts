import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faFluxCapacitor,
  faReel,
  faScrewdriver,
} from "@fortawesome/pro-duotone-svg-icons";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Filter } from "../filters/dto";

export const CategoryConverter = {
  toFirestore(category: Category): DocumentData {
    return category;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<CategoryRow>): Category {
    const data = snapshot.data()!;

    return {
      ...data,
      keyword: snapshot.id,
      icon: data.icon ? getCategoryIcon(data.icon) : undefined,
      image:
        "https://sewingcrafter.com/wp-content/uploads/2021/03/Best-Sewing-Machines-for-Kids.jpg",
    };
  },
};

export type CategoryIcon = "Machine" | "Accessory" | "Tool";

export type CategoryRow = {
  name: string;
  icon?: CategoryIcon;
  description: string;
  filters?: any[];
};
export type Category = {
  keyword: string;
  name: string;
  icon?: IconDefinition;
  description: string;
  image: string;
  filters?: Filter[];
};

export const getCategoryIcon = (category: CategoryIcon): IconDefinition => {
  switch (category) {
    case "Machine":
      return faFluxCapacitor;
    case "Accessory":
      return faReel;
    case "Tool":
      return faScrewdriver;
  }
};
