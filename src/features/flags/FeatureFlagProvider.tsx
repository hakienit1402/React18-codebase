import React, { createContext, useContext, useMemo } from "react";

export type FlagMap = Record<string, boolean>;

type ProviderProps = {
  children: React.ReactNode;
  flags?: FlagMap;
};

const FeatureFlagContext = createContext<FlagMap>({});

export function FeatureFlagProvider({ children, flags }: ProviderProps) {
  const merged = useMemo<FlagMap>(() => {
    // Load from env window._env_.FF_* and import.meta.env.VITE_FF_*
    const envFlags: FlagMap = {};
    const runtimeEnv = (window as any)._env_ ?? {};
    for (const key of Object.keys(runtimeEnv)) {
      if (key.startsWith("FF_")) envFlags[key] = String(runtimeEnv[key]).toLowerCase() === "true";
    }
    const buildEnv = (import.meta as any).env ?? {};
    for (const key of Object.keys(buildEnv)) {
      if (key.startsWith("VITE_FF_")) envFlags[key.replace("VITE_", "")] =
        String(buildEnv[key]).toLowerCase() === "true";
    }
    return { ...envFlags, ...(flags ?? {}) };
  }, [flags]);

  return (
    <FeatureFlagContext.Provider value={merged}>{children}</FeatureFlagContext.Provider>
  );
}

export function useFlag(name: string, defaultValue = false): boolean {
  const map = useContext(FeatureFlagContext);
  return map[name] ?? defaultValue;
}

export function FlagGate({ name, children }: { name: string; children: React.ReactNode }) {
  const on = useFlag(name);
  if (!on) return null;
  return <>{children}</>;
}


