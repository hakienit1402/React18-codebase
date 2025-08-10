import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

import { Button } from "@/components/Button";
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

interface DateRangeFieldProps extends CommonFieldProps {
  isLoading?: boolean;
  autoTrim?: boolean;
  type?: string;
  description?: string;
}

export function DateRangeInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
}: UseControllerProps<TFieldValues, TName> & DateRangeFieldProps) {
  const [open, setOpen] = useState(false);
  const [pendingRange, setPendingRange] = useState<DateRange | undefined>(undefined);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // useEffect(() => {
        //   if (open) {
        //     if (field.value && typeof field.value === 'object') {
        //       setPendingRange({
        //         from: field.value.from ?? undefined,
        //         to: field.value.to ?? undefined,
        //       });
        //     } else {
        //       setPendingRange(undefined);
        //     }
        //   }
        // }, [open]);

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    type="text"
                    readOnly
                    value={
                      field.value?.from && field.value?.to
                        ? `${format(field.value.from, "dd/MM/yyyy")} - ${format(field.value.to, "dd/MM/yyyy")}`
                        : ""
                    }
                    placeholder="Date"
                    className="w-full pl-3 text-left font-normal"
                    onClick={() => setOpen(true)}
                    endAdornment={
                      <CalendarIcon onClick={() => setOpen(true)} className="h-4 w-4" />
                    }
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={pendingRange}
                  onSelect={(range) => setPendingRange(range as DateRange)}
                  initialFocus
                />
                <div className="mt-2 flex justify-end gap-2 border-t border-light px-2 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setPendingRange(field.value);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      field.onChange(pendingRange);
                      setOpen(false);
                    }}
                    disabled={!(pendingRange?.from && pendingRange?.to)}
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
