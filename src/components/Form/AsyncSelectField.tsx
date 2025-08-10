import { ComponentProps } from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

import { CommonFieldProps } from "./form.type";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import AsyncCreateAbleSelectInput from "@/components/SelectInput/AsyncCreateableSelectInput";
import { cn } from "@/lib/utils";

function AsyncCreateableSelectField<
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
  ...props
}: UseControllerProps<TFieldValues, TName> &
  CommonFieldProps &
  ComponentProps<typeof AsyncCreateAbleSelectInput>) {
  const { control: controlContext, trigger } = useFormContext<
    TFieldValues,
    TName
  >();

  const debouncedClearError = () => {
    setTimeout(() => {
      trigger(name);
    }, 300);
  };
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
            <div
              data-testid={props.dataTestId}
              className={cn("relative flex items-center", {})}
            >
              <FormControl>
                <AsyncCreateAbleSelectInput
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                    debouncedClearError();
                  }}
                  extendOnchange={extendOnchange}
                  hasDescription={!!description}
                  {...props}
                  error={!!fieldState.error}
                />
              </FormControl>
            </div>
            {description && !fieldState.error && (
              <FormDescription>{description}</FormDescription>
            )}
            {!hideErrorMessage && (
              <FormMessage className={errorMessageClassName} />
            )}
          </FormItem>
        );
      }}
    />
  );
}

export default AsyncCreateableSelectField;
