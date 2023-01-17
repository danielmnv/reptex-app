export type Store = {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: StoreHours[];
  url: string;
  coords: StoreCoords;
};

export type StoreCoords = {
  lat: number;
  lng: number;
};

export type StoreHours = {
  range: string;
  time: string[];
};
