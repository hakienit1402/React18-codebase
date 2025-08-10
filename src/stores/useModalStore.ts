import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStoreState {
  open?: boolean;
  setOpen: (open: boolean) => void;
  openChild?: boolean;
  setOpenChild: (open: boolean) => void;
  resetModalStore: () => void;
}

export const useModalStore = create<ModalStoreState>()(
  devtools((set) => ({
    open: false,
    openChild: false,
    setOpenChild: (open: boolean) => set({ openChild: open }),
    setOpen: (open: boolean) => set({ open }),
    resetModalStore: () => set({ open: false, openChild: false }),
  })),
);
