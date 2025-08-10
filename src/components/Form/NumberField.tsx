import { debounce } from "lodash";
import { Loader2Icon, LockIcon } from "lucide-react";
import { ComponentProps, useEffect, useMemo } from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import { NumberFormatValues } from "react-number-format";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormWarning,
} from "@/components/Form";
import NumberFormat from "@/components/InputNumber";
import { cn } from "@/lib/utils";

interface NumberFieldProps {
  isLoading?: boolean;
  hasIconBlock?: boolean;
  textAlign?: "start" | "end";
  hasAsterisk?: boolean;
  description?: string;
  label?: string;
  labelClassName?: string;
  formItemClassName?: string;
  descriptionClassName?: string;
  hideErrorMessage?: boolean;
  errorMessageClassName?: string;
  warningMessage?: string;
  extendedOnChange?: (number: NumberFormatValues) => void;
  warningMessageClassName?: string;
}

function NumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  labelClassName,
  formItemClassName,
  hideErrorMessage,
  hasIconBlock,
  isLoading,
  errorMessageClassName,
  descriptionClassName,
  hasAsterisk,
  description,
  control,
  extendedOnChange,
  warningMessage,
  warningMessageClassName,
  name,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  NumberFieldProps &
  ComponentProps<typeof NumberFormat>) {
  const { control: controlContext, trigger } = useFormContext<
    TFieldValues,
    TName
  >();
  const onBlurWorkaround = (event: React.FocusEvent<HTMLInputElement>) => {
    const element = event.relatedTarget;
    if (
      element &&
      (element.tagName === "A" ||
        element.tagName === "BUTTON" ||
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA")
    ) {
      (element as HTMLElement).focus();
    }
  };

  const debouncedOnChange = useMemo(() => {
    return debounce((number) => {
      extendedOnChange?.(number);
    }, 300);
  }, [extendedOnChange]);

  const debouncedClearError = useMemo(() => {
    return debounce(() => {
      trigger(name);
    }, 300);
  }, [trigger, name]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
      debouncedClearError.cancel();
    };
  }, [debouncedOnChange, debouncedClearError]);

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => {
        const isHasEndAdornment =
          props.endAdornment ||
          isLoading ||
          (hasIconBlock && props.disabled && !isLoading);
        return (
          <FormItem className={formItemClassName}>
            {label && (
              <FormLabel className={labelClassName}>
                {label}{" "}
                {hasAsterisk && (
                  <span className="ml-1 text-semantics-red-500">*</span>
                )}
              </FormLabel>
            )}
            <div className={cn("relative flex items-center", {})}>
              <FormControl>
                <NumberFormat
                  {...props}
                  {...field}
                  onValueChange={(number) => {
                    field.onChange(number.value);
                    debouncedOnChange(number);
                    debouncedClearError();
                  }}
                  onBlur={(e) => {
                    onBlurWorkaround(e);
                    props.onBlur?.(e);
                  }}
                  endAdornment={
                    isHasEndAdornment ? (
                      <div className="flex items-center gap-1">
                        {props.endAdornment}

                        {hasIconBlock && props.disabled && !isLoading && (
                          <LockIcon className={cn("text-neutral-light-500")} />
                        )}
                        {isLoading && (
                          <Loader2Icon className="animate-spin text-neutral-light-500" />
                        )}
                      </div>
                    ) : undefined
                  }
                />
              </FormControl>
            </div>
            {description && !fieldState.error && (
              <FormDescription className={descriptionClassName}>
                {description}
              </FormDescription>
            )}
            {!hideErrorMessage && (
              <FormMessage className={errorMessageClassName} />
            )}
            {warningMessage && !fieldState.error && (
              <FormWarning className={warningMessageClassName}>
                {warningMessage}
              </FormWarning>
            )}
          </FormItem>
        );
      }}
    />
  );
}

export default NumberField;
