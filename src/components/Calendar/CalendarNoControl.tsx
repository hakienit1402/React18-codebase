import { CalendarIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Calendar } from "@/components/Calendar";
import { Input } from "@/components/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { formatDateUTC } from "@/lib/days-timezone";
import { cn } from "@/lib/utils";

interface CalendarNoControlProps {
  label?: string;
  description?: string;
  placeholder?: string;
  formatStr?: string;
  inputClassName?: string;
  size?: "small" | "medium" | "large";
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  isClearable?: boolean;
}

export function CalendarNoControl({
  label,
  description,
  placeholder,
  formatStr,
  inputClassName,
  size,
  value: propValue,
  onChange,
  isClearable = true,
}: CalendarNoControlProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(propValue ?? null);
  useEffect(() => {
    setValue(propValue ?? null);
  }, [propValue]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    setValue(date);
    setOpen(false);
    onChange?.(date);
  };
  const handleClear = () => {
    setValue(null);
    onChange?.(null);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            className={cn(
              "w-full text-left font-normal leading-4",
              {
                "h-8 text-sm": size === "small",
                "h-10 text-base": size === "medium",
                "h-12 text-lg": size === "large",
              },
              inputClassName,
            )}
            placeholder={placeholder}
            readOnly
            value={value ? formatDateUTC(value, formatStr) : ""}
            onClick={() => setOpen(true)}
            endAdornment={
              <div className="flex items-center gap-1">
                {isClearable && value && (
                  <X
                    className="h-5 w-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    aria-label="Clear"
                    strokeWidth={2}
                  />
                )}
                <CalendarIcon className="h-4 w-4" />
              </div>
            }
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description && <span className="text-muted-foreground mt-1 text-xs">{description}</span>}
    </div>
  );
}
