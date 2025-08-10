import { debounce } from "lodash";
import { ComponentProps, useEffect, useMemo } from "react";
import { FieldPath, FieldValues, UseControllerProps, useFormContext } from "react-hook-form";
import useMeasure from "react-use-measure";

import { CommonFieldProps } from "./form.type";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import SelectInput from "@/components/SelectInput";
import { cn } from "@/lib/utils";

function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  labelClassName,
  formItemClassName,
  hideErrorMessage,
  errorMessageClassName,
  hasAsterisk,
  description,
  control,
  name,
  extendOnchange,
  checkMenuPlacement,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  CommonFieldProps &
  ComponentProps<typeof SelectInput>) {
  const { control: controlContext } = useFormContext<TFieldValues, TName>();
  const [ref, bounds] = useMeasure({
    scroll: true,
  });
  const innerHeight = window.innerHeight;

  const debouncedExtendOnchange = useMemo(() => {
    return debounce((item, action) => {
      extendOnchange?.(item, action);
    }, 300);
  }, [extendOnchange]);

  useEffect(() => {
    return () => debouncedExtendOnchange.cancel();
  }, [debouncedExtendOnchange]);

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem ref={ref} className={formItemClassName}>
            {label && (
              <FormLabel className={labelClassName}>
                {label} {hasAsterisk && <span className="ml-1 text-semantics-red-500">*</span>}
              </FormLabel>
            )}
            <div data-testid={props.dataTestId} className={cn("relative flex items-center", {})}>
              <FormControl>
                <SelectInput
                  {...field}
                  extendOnchange={debouncedExtendOnchange}
                  hasDescription={!!description}
                  {...props}
                  error={!!fieldState.error}
                  {...(checkMenuPlacement && {
                    menuPosition: "fixed",
                    menuPlacement: innerHeight - bounds.bottom > 300 ? "bottom" : "top",
                    maxMenuHeight:
                      innerHeight - bounds.bottom > 300 ? bounds.bottom - 5 : bounds.top - 5,
                  })}
                />
              </FormControl>
            </div>
            {description && !fieldState.error && <FormDescription>{description}</FormDescription>}
            {!hideErrorMessage && <FormMessage className={errorMessageClassName} />}
          </FormItem>
        );
      }}
    />
  );
}

export default SelectField;
