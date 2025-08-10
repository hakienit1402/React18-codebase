import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { LoadingState, Status } from "./store.types";

interface LoadingStoreState {
  loadingStates: LoadingState;
  setLoading: (key: string, status: Status) => void;
  isLoading: (key: string) => boolean;
  reset: (key: string) => void;
  resetAll: () => void;
}

export const useLoadingStore = create<LoadingStoreState>()(
  devtools((set, get) => ({
    loadingStates: {},
    setLoading: (key: string, status: Status) =>
      set((state) => ({
        loadingStates: { ...state.loadingStates, [key]: status },
      })),
    isLoading: (key: string) => get().loadingStates[key] === "loading",
    reset: (key: string) =>
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _, ...rest } = state.loadingStates;
        return { loadingStates: rest };
      }),
    resetAll: () => set({ loadingStates: {} }),
  })),
);
