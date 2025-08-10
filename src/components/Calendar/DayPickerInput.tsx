import { format, isValid, parse } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { Matcher, SelectSingleEventHandler } from "react-day-picker";
import { Control, FieldPath, FieldValues } from "react-hook-form";

// import 'react-day-picker/dist/style.css';

// import { Button } from '@/components/Button';
import { Calendar } from "@/components/Calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormWarning,
} from "@/components/Form";
import { Input } from "@/components/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { cn } from "@/lib/utils";

type DayPickerInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  dateFormat?: string;
  placeholder?: string;
  disabled?: boolean;
  mode?: "single";
  size?: "small" | "medium" | "large";
  inputClassName?: string;
  extendOnChange?: (date: Date | undefined) => void;
  dateDisabled?: Matcher | Matcher[];
  errorMessageClassName?: string;
  description?: string;
  hideErrorMessage?: boolean;
  warningMessage?: string;
  isClearable?: boolean;
  warningMessageClassName?: string;
  defaultMonth?: Date;
};

export function DayPickerInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  dateFormat = "dd/MM/yyyy",
  placeholder = "dd/MM/yyyy",
  size = "small",
  inputClassName,
  extendOnChange,
  dateDisabled,
  errorMessageClassName,
  description,
  hideErrorMessage,
  isClearable = true,
  warningMessage,
  warningMessageClassName,
  defaultMonth,
}: DayPickerInputProps<TFieldValues, TName>) {
  const [open, setOpen] = useState(false);

  const computeSelected = (value: string | undefined) => {
    const date = value ? parse(value, dateFormat, new Date()) : undefined;
    return date && isValid(date) ? date : undefined;
  };

  const computeDisplayValue = (selected: Date | undefined) => {
    return selected instanceof Date ? format(selected, dateFormat) : "";
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selected: Date | undefined = computeSelected(field.value);
        const displayValue = computeDisplayValue(selected);

        const handleSingleSelect: SelectSingleEventHandler = (date: Date | undefined) => {
          if (!date) return;
          field.onChange(format(date, dateFormat));
          extendOnChange?.(date);
          setOpen(false);
        };

        const handleClear = () => {
          field.onChange("");
          extendOnChange?.(undefined);
        };

        return (
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
                    value={displayValue}
                    endAdornment={
                      <div className="flex items-center gap-1">
                        {isClearable && selected && (
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
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  defaultMonth={selected || defaultMonth}
                  selected={selected as Date | undefined}
                  onSelect={handleSingleSelect}
                  disabled={dateDisabled}
                />
              </PopoverContent>
            </Popover>
            {description && !fieldState.error && <FormDescription>{description}</FormDescription>}
            {!hideErrorMessage && <FormMessage className={errorMessageClassName} />}
            {warningMessage && !fieldState.error && (
              <FormWarning className={warningMessageClassName}>{warningMessage}</FormWarning>
            )}
          </FormItem>
        );
      }}
    />
  );
}
