import { format, isValid, parse } from "date-fns";
import { debounce } from "lodash";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

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
import { DEFAULT_PICKER_DATE_FORMAT } from "@/lib/days-timezone";
import { cn } from "@/lib/utils";

type FormDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  placeholder?: string;
  className?: string;
  showTimeSelect?: boolean;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  extendOnChange?: (date: Date | undefined) => void;
  size?: "small" | "medium" | "large";
  description?: string;
  warningMessageClassName?: string;
  warningMessage?: string;
  errorMessageClassName?: string;
  hideErrorMessage?: boolean;
  inputClassName?: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDateInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when input receives focus
    e.target.select();
    // Call the original onFocus handler if it exists
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  return (
    <Input
      {...props}
      ref={ref}
      inputClassName={cn("!pl-3 !pr-10 !py-2", props.inputClassName)}
      onFocus={handleFocus}
    />
  );
});
CustomDateInput.displayName = "CustomDateInput";
export function DayPickerInputField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder = DEFAULT_PICKER_DATE_FORMAT,
  className,
  dateFormat = DEFAULT_PICKER_DATE_FORMAT,
  minDate,
  maxDate,
  extendOnChange,
  description,
  warningMessage,
  warningMessageClassName,
  errorMessageClassName,
  inputClassName,
  size,
}: FormDatePickerProps<TFieldValues, TName>) {
  const { control, trigger } = useFormContext<TFieldValues>();
  const datePickerRef = useRef<DatePicker>(null);

  const debouncedExtendOnChange = useMemo(() => {
    return debounce((date: Date | undefined) => {
      extendOnChange?.(date);
    }, 300);
  }, [extendOnChange]);

  useEffect(() => {
    return () => debouncedExtendOnChange.cancel();
  }, [debouncedExtendOnChange]);

  // Handle calendar icon click to open dropdown
  const handleCalendarIconClick = () => {
    datePickerRef.current?.setOpen(true);
  };
  // Function to try parsing date with multiple formats
  const tryParseDate = (value: string): Date | undefined => {
    if (!value) return undefined;

    // Don't try to parse if input is too short to be a valid date
    // Most date formats require at least 6-8 characters
    if (value.length < 6) return undefined;

    // Common date formats that users might input
    const formats = [
      "dd-MMM-yyyy", // 25-Dec-2023
      "dd/MM/yyyy", // 25/12/2023
      "MM/dd/yyyy", // 12/25/2023
      "yyyy-MM-dd", // 2023-12-25
      "dd-MM-yyyy", // 25-12-2023
      "yyyy/MM/dd", // 2023/12/25
      "dd MMM yyyy", // 25 Dec 2023
      "MMM dd, yyyy", // Dec 25, 2023
      "dd.MM.yyyy", // 25.12.2023
      "MM-dd-yyyy", // 12-25-2023
    ];

    // Try each format until one works
    for (const fmt of formats) {
      try {
        const date = parse(value, fmt, new Date());
        if (isValid(date)) {
          return date;
        }
      } catch {
        // Continue to next format
      }
    }

    // Try native Date constructor as fallback
    try {
      const date = new Date(value);
      if (isValid(date)) {
        return date;
      }
    } catch {
      // Date parsing failed
    }

    return undefined;
  };

  const computeSelected = (value: string | undefined) => {
    return tryParseDate(value || "");
  };

  const debouncedClearError = () => {
    setTimeout(() => {
      trigger(name);
    }, 300);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selected: Date | undefined = computeSelected(field.value);
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <DatePicker
                ref={datePickerRef}
                selected={selected}
                showIcon
                onChange={(date: Date | null) => {
                  if (!date) {
                    field.onChange("");
                    debouncedExtendOnChange(undefined);
                    // Focus the input after clearing
                    setTimeout(() => {
                      datePickerRef.current?.setFocus();
                    }, 0);
                    debouncedClearError();
                    return;
                  }
                  field.onChange(format(date, dateFormat));
                  debouncedExtendOnChange(date);
                  debouncedClearError();
                }}
                onSelect={() => {
                  // Close calendar and blur the input after date selection from calendar
                  setTimeout(() => {
                    datePickerRef.current?.setOpen(false);
                  }, 0);
                  debouncedClearError();
                }}
                onChangeRaw={(event) => {
                  const rawInput = (event?.target as HTMLInputElement)?.value ?? "";

                  // Open calendar when user starts typing
                  if (rawInput.length > 0) {
                    datePickerRef.current?.setOpen(true);
                  }

                  // Try to parse the input with flexible formats
                  const parsedDate = tryParseDate(rawInput);

                  if (parsedDate) {
                    // If successfully parsed, format it to our desired format
                    const formattedDate = format(parsedDate, dateFormat);
                    field.onChange(formattedDate);
                    debouncedExtendOnChange(parsedDate);
                  } else {
                    // If parsing failed, keep the raw input for continued typing
                    field.onChange(rawInput);
                  }
                  debouncedClearError();
                }}
                openToDate={selected || minDate || new Date()}
                placeholderText={placeholder}
                dateFormat={dateFormat}
                minDate={minDate}
                isClearable
                maxDate={maxDate}
                shouldCloseOnSelect={true}
                customInput={<CustomDateInput inputClassName={inputClassName} />}
                className={cn(
                  "",
                  {
                    "h-8 text-sm": size === "small",
                    "h-10 text-base": size === "medium",
                    "h-12 text-lg": size === "large",
                  },
                  className,
                )}
                icon={
                  <CalendarIcon
                    className="h-4 w-4 cursor-pointer p-0"
                    onClick={handleCalendarIconClick}
                  />
                }
                portalId="root-portal"
              />
            </FormControl>
            {description && !fieldState.error && <FormDescription>{description}</FormDescription>}
            <FormMessage className={errorMessageClassName} />
            {warningMessage && !fieldState.error && (
              <FormWarning className={warningMessageClassName}>{warningMessage}</FormWarning>
            )}
          </FormItem>
        );
      }}
    />
  );
}
