import {
  FieldPath,
  FieldValues,
  PathValue,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

import { Checkbox } from "@/components/Checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import { CommonFieldProps } from "@/components/Form/form.type";
import { SelectOptionTypes } from "@/components/SelectInput";
import { cn } from "@/lib/utils";

interface CheckboxGroupFieldProps<
  TOption extends SelectOptionTypes = SelectOptionTypes,
> extends CommonFieldProps {
  isLoading?: boolean;
  options: TOption[];
  extendOnchange?: (data?: TOption) => void;
}

function CheckboxGroupField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends SelectOptionTypes = SelectOptionTypes,
>({
  name,
  label,
  labelClassName,
  formItemClassName,
  hasAsterisk = false,
  errorMessageClassName,
  control,
  hideErrorMessage,
  options,
  extendOnchange,
}: UseControllerProps<TFieldValues, TName> &
  CommonFieldProps &
  CheckboxGroupFieldProps<TOption>) {
  const { control: controlContext } = useFormContext<TFieldValues, TName>();

  const safeArray = (val: PathValue<TFieldValues, TName>) =>
    Array.isArray(val) ? val : [];

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => {
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
            <div className="flex flex-col space-y-3">
              {options.map((item) => {
                const checkboxId = `${name}-${item.unique}`;
                return (
                  <label
                    key={item.value}
                    htmlFor={checkboxId}
                    className={cn(
                      "flex cursor-pointer items-center space-x-2",
                      item.isDisabled && "cursor-not-allowed opacity-60",
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        id={checkboxId}
                        checked={safeArray(field.value)?.some(
                          (v: TOption) => v.unique === item.unique,
                        )}
                        disabled={item.isDisabled}
                        onCheckedChange={(checked) => {
                          if (item.isDisabled) return;
                          const newValue = checked
                            ? [...safeArray(field.value), item]
                            : safeArray(field.value)?.filter(
                                (v: TOption) => v.unique !== item.unique,
                              );
                          field.onChange(newValue);
                          extendOnchange?.(item);
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={checkboxId}
                      className={cn(
                        "m-0 cursor-pointer text-sm font-normal text-neutral-light-300",
                        item.isDisabled && "cursor-not-allowed",
                      )}
                    >
                      {item.label}
                    </FormLabel>
                  </label>
                );
              })}
            </div>
            {!hideErrorMessage && fieldState.error && (
              <FormMessage
                className={cn(
                  "text-sm text-semantics-red-500",
                  errorMessageClassName,
                )}
              >
                {fieldState.error.message}
              </FormMessage>
            )}
          </FormItem>
        );
      }}
    />
  );
}

export default CheckboxGroupField;
