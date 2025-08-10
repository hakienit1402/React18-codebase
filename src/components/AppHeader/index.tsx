import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useFlag } from "@/features/flags/FeatureFlagProvider";

import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title: string | ReactNode;
  moduleName?: string | ReactNode;
  className?: string;
}
export const AppHeader = ({ title, moduleName, className }: AppHeaderProps) => {
  const { t } = useTranslation(["common", "home"]);
  const showBetaBadge = useFlag("FF_BETA_BADGE");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title || (
        <h1 className="text-3xl font-bold">
          {t("home:title")} {showBetaBadge && <span className="ml-2 text-xs">(beta)</span>}
        </h1>
      )}
      {moduleName && (
        <div className="text-2xl font-semibold text-neutral-light-100">{moduleName}</div>
      )}
    </div>
  );
};
