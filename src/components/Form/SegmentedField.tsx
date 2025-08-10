import { FieldPath, FieldValues, UseControllerProps, useFormContext } from "react-hook-form";

import { CommonFieldProps } from "./form.type";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import { cn } from "@/lib/utils";

interface OptionItem {
  value: unknown;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
}
interface SegmentedFieldProps extends CommonFieldProps {
  options: OptionItem[];
  optionsClassName?: string;
  optionItemClassName?: string;
  isOutputOption?: boolean;
  readonly?: boolean;
}

function SegmentedField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  labelClassName,
  formItemClassName,
  hideErrorMessage,
  errorMessageClassName,
  hasAsterisk,
  control,
  name,
  options,
  optionsClassName,
  optionItemClassName,
  isOutputOption,
  disabled,
  readonly,
  description,
}: UseControllerProps<TFieldValues, TName> & SegmentedFieldProps) {
  const { control: controlContext } = useFormContext<TFieldValues, TName>();

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={formItemClassName}>
          {label && (
            <FormLabel className={labelClassName}>
              {label} {hasAsterisk && <span className="ml-1 text-semantics-red-500">*</span>}{" "}
            </FormLabel>
          )}
          <div className={cn("relative flex items-center", {})}>
            <FormControl>
              <div className={cn("flex overflow-hidden", optionsClassName)}>
                {options.map((option, index) => {
                  const isActiveItem = isOutputOption
                    ? field.value.value === option.value
                    : field.value === option.value;
                  const isDisabled = disabled || option?.disabled;
                  const isReadOnly = readonly;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex min-w-32 cursor-pointer select-none items-center justify-center overflow-hidden border border-neutral-dark-500 px-4 py-2 text-sm text-neutral-dark-500 transition",
                        {
                          "border-primary-300 bg-primary-300 text-neutral-dark-100":
                            isActiveItem && !isDisabled,
                          "font-semibold": isActiveItem,
                          "text-neutral-light-300 hover:border-neutral-light-300":
                            !isActiveItem && !isDisabled,
                          "rounded-bl-md rounded-tl-md": index === 0,
                          "rounded-br-md rounded-tr-md": index === options.length - 1,
                          "cursor-not-allowed bg-neutral-dark-200": isDisabled,
                          "bg-neutral-dark-100": isDisabled && isActiveItem,
                        },
                        optionItemClassName,
                      )}
                      onClick={
                        isDisabled || isReadOnly
                          ? undefined
                          : () => {
                              if (isOutputOption) {
                                field.onChange(option);
                                return;
                              }
                              field.onChange(option.value);
                            }
                      }
                    >
                      {isActiveItem}
                      {option.label}
                    </div>
                  );
                })}
              </div>
            </FormControl>
          </div>
          {description && !fieldState.error && <FormDescription>{description}</FormDescription>}
          {!hideErrorMessage && <FormMessage className={errorMessageClassName} />}
        </FormItem>
      )}
    />
  );
}

export default SegmentedField;
