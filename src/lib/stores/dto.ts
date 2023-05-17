import {
  DocumentData,
  GeoPoint,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const StoreConverter = {
  toFirestore(store: Store): DocumentData {
    return store;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<StoreRow>): Store {
    const data = snapshot.data()!;

    return {
      ...data,
      id: snapshot.id,
      coords: {
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      },
    };
  },
};

export type StoreRow = {
  name: string;
  address: string;
  phone: string;
  hours: {
    range: string;
    time: string[];
  }[];
  url: string;
  coords: GeoPoint;
  main?: boolean;
};

export type Store = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: StoreHours[];
  url: string;
  coords: StoreCoords;
  main?: boolean;
};

export type StoreCoords = {
  lat: number;
  lng: number;
};

export type StoreHours = {
  range: string;
  time: string[];
};
