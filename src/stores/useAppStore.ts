import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { WithPersist } from "./store.types";

interface AppState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  resetAppStore: () => void;
}

export const useAppStore = create<WithPersist<AppState>>()(
  devtools(
    persist(
      (set) => ({
        _hasHydrated: false,
        sidebarOpen: false,
        setSidebarOpen: (state: boolean) => set({ sidebarOpen: state }),
        setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
        theme: "light",
        setTheme: (theme) => set({ theme }),
        resetAppStore: () =>
          set({ sidebarOpen: false, theme: "light", _hasHydrated: false }),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
  ),
);
