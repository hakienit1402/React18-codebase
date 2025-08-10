import { StateCreator } from "zustand";

export type SetState<T> = StateCreator<T, [], [], T>;

export type StoreApi<T> = {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
};

export type WithPersist<T> = T & {
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
};

export type Status = "idle" | "loading" | "success" | "error";

export type LoadingState = {
  [key: string]: Status;
};
