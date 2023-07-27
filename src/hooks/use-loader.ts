import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}

export const useLoader = create<LoaderState>()((set) => ({
  isLoading: false,
  setLoading: (v) => set(() => ({ isLoading: v })),
}));
