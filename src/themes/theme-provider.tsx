import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type NetworkMode = "mainnet" | "testnet";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  networkMode: NetworkMode;
  setTheme: (theme: Theme) => void;
  setNetworkMode: (mode: NetworkMode) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  networkMode: "mainnet",
  setTheme: () => null,
  setNetworkMode: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [networkMode, setNetworkMode] = useState<NetworkMode>(
    () => (localStorage.getItem("network-mode") as NetworkMode) || "mainnet",
  );
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Update color mode classes
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Update network mode classes
    root.classList.remove("mainnet", "testnet");
    root.classList.add(networkMode);
  }, [theme, networkMode]);

  const value = {
    theme,
    networkMode,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    setNetworkMode: (mode: NetworkMode) => {
      localStorage.setItem("network-mode", mode);
      setNetworkMode(mode);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
