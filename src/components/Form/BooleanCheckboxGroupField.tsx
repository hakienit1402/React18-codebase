import { FieldPath, FieldValues, UseControllerProps, useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/Checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form";
import { CommonFieldProps } from "@/components/Form/form.type";
import { cn } from "@/lib/utils";

interface BooleanCheckboxOption {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface BooleanCheckboxGroupFieldProps extends CommonFieldProps {
  isLoading?: boolean;
  options: BooleanCheckboxOption[];
  extendOnchange?: (key: string, checked: boolean) => void;
  layoutClassName?: string;
}

function BooleanCheckboxGroupField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
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
  layoutClassName,
}: UseControllerProps<TFieldValues, TName> & CommonFieldProps & BooleanCheckboxGroupFieldProps) {
  const { control: controlContext } = useFormContext<TFieldValues, TName>();

  const safeObject = (val: unknown) =>
    typeof val === "object" && val !== null ? (val as Record<string, boolean>) : {};

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => {
        const currentValue = safeObject(field.value);

        return (
          <FormItem className={formItemClassName}>
            {label && (
              <FormLabel className={labelClassName}>
                {label} {hasAsterisk && <span className="ml-1 text-semantics-red-500">*</span>}
              </FormLabel>
            )}
            <div className={cn("flex flex-col gap-2", layoutClassName)}>
              {options.map((option) => {
                const checkboxId = `${name}-${option.key}`;
                const isChecked = currentValue[option.key] || false;

                return (
                  <label
                    key={option.key}
                    htmlFor={checkboxId}
                    className={cn(
                      "flex cursor-pointer items-start gap-2",
                      option.disabled && "cursor-not-allowed opacity-60",
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        id={checkboxId}
                        checked={isChecked}
                        disabled={option.disabled}
                        onCheckedChange={(checked) => {
                          if (option.disabled) return;

                          const newValue = {
                            ...currentValue,
                            [option.key]: Boolean(checked),
                          };

                          field.onChange(newValue);
                          extendOnchange?.(option.key, Boolean(checked));
                        }}
                      />
                    </FormControl>
                    <div className="flex flex-col space-y-1">
                      <FormLabel
                        htmlFor={checkboxId}
                        className={cn(
                          "m-0 cursor-pointer text-sm font-normal text-neutral-light-300",
                          option.disabled && "cursor-not-allowed",
                        )}
                      >
                        {option.label}
                      </FormLabel>
                      {option.description && (
                        <span className="text-xs text-neutral-light-400">{option.description}</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
            {!hideErrorMessage && fieldState.error && (
              <FormMessage className={cn("text-sm text-semantics-red-500", errorMessageClassName)}>
                {fieldState.error.message}
              </FormMessage>
            )}
          </FormItem>
        );
      }}
    />
  );
}

export default BooleanCheckboxGroupField;
