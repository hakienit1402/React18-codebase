import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

import { Calendar } from "@/components/Calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import { CommonFieldProps } from "@/components/Form/form.type";
import { Input } from "@/components/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { formatDateUTC } from "@/lib/days-timezone";
import { cn } from "@/lib/utils";

interface DateFieldProps extends CommonFieldProps {
  hasIconBlock?: boolean;
  isLoading?: boolean;
  autoTrim?: boolean;
  type?: string;
  description?: string;
  placeholder?: string;
  formatStr?: string;
  inputClassName?: string;
  size?: "small" | "medium" | "large";
}

export function CalendarInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  formatStr,
  inputClassName,
  size,
}: UseControllerProps<TFieldValues, TName> & DateFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  type="text"
                  className={cn("w-full text-left font-normal leading-4", {
                    "h-8 text-sm": size === "small",
                    "h-10 text-base": size === "medium",
                    "h-12 text-lg": size === "large",
                  })}
                  inputClassName={cn("disabled:text-neutral-light-300", inputClassName)}
                  placeholder={placeholder}
                  readOnly
                  value={field.value ? formatDateUTC(field.value, formatStr) : ""}
                  endAdornment={<CalendarIcon className="h-4 w-4" />}
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
