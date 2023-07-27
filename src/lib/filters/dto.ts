export type Filter = CheckboxFilter | RangeFilter;

export type CheckboxFilter = {
  type: "checkbox";
  name: string;
  values: string[];
};

export type RangeFilter = {
  type: "range";
  name: string;
  min: number;
  max: number;
  format?: string;
};
