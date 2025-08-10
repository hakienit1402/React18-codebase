import { EllipsisVertical } from "lucide-react";
import React from "react";

import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { cn } from "@/lib/utils";

interface CustomDropdownMenuProps {
  data: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    onClick?: () => void;
    "data-testid"?: string;
  }[];
  triggerIcon?: React.ReactNode;
  contentClassName?: string;
  btnTrigger?: React.ReactNode;
}

const CustomDropdownMenu = ({
  triggerIcon = <EllipsisVertical className={cn("text-primary-500")} />,
  data,
  contentClassName,
  btnTrigger,
}: CustomDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {btnTrigger ? (
          btnTrigger
        ) : (
          <Button data-testid="dropdown-menu-trigger" variant="tertiary">
            {triggerIcon}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-56 rounded-xl border-common-outline bg-common-surface p-0",
          contentClassName,
        )}
        side="bottom"
        align="end"
      >
        {data?.map((item) => (
          <DropdownMenuItem
            disabled={item.isDisabled}
            key={item.value}
            className="h-11 px-4 py-2"
            onClick={item.onClick}
            data-testid={item["data-testid"]}
          >
            {item.icon}
            <span className="text-neutral-light-300">{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdownMenu;
