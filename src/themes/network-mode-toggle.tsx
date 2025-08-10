import { CoinsIcon, Server } from "lucide-react";

import { Label } from "@/components/Label";
import { Switch } from "@/components/Switch";
import { useTheme } from "@/themes/theme-provider";

export function NetworkModeToggle({ className }: { className?: string }) {
  const { networkMode, setNetworkMode } = useTheme();

  const handleToggle = () => {
    setNetworkMode(networkMode === "mainnet" ? "testnet" : "mainnet");
  };

  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      <div className="relative">
        <Switch
          id="network-mode"
          checked={networkMode === "testnet"}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-testnet-primary data-[state=unchecked]:bg-mainnet-primary"
        />
        <CoinsIcon className="mainnet:opacity-100 testnet:opacity-0 absolute left-0.5 top-0.5 h-4 w-4 text-mainnet-secondary transition-opacity" />
        <Server className="mainnet:opacity-0 testnet:opacity-100 absolute right-0.5 top-0.5 h-4 w-4 text-testnet-secondary transition-opacity" />
      </div>
      <Label
        htmlFor="network-mode"
        className="flex cursor-pointer items-center"
      >
        <span className="mainnet:block testnet:hidden text-mainnet-primary">
          Mainnet
        </span>
        <span className="mainnet:hidden testnet:block text-testnet-primary">
          Testnet
        </span>
      </Label>
    </div>
  );
}
