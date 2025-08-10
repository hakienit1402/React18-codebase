import { Loader2Icon, LockIcon } from "lucide-react";
import { ComponentProps } from "react";
import { FieldPath, FieldValues, UseControllerProps, useFormContext } from "react-hook-form";

import { Textarea } from "../Textarea";
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

interface TextareaFieldProps extends CommonFieldProps {
  hasIconBlock?: boolean;
  isLoading?: boolean;
  autoTrim?: boolean;
}

function TextareaField<
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
  autoTrim,
  hasAsterisk,
  control,
  name,
  description,
  ...props
}: UseControllerProps<TFieldValues, TName> & TextareaFieldProps & ComponentProps<typeof Textarea>) {
  const { control: controlContext } = useFormContext<TFieldValues, TName>();
  const onBlurWorkaround = (event: React.FocusEvent<HTMLTextAreaElement>) => {
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

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => {
        const isHasEndAdornment =
          props.endAdornment || isLoading || (hasIconBlock && props.disabled && !isLoading);
        return (
          <FormItem className={formItemClassName}>
            {label && (
              <FormLabel className={labelClassName}>
                {label} {hasAsterisk && <span className="ml-1 text-semantics-red-500">*</span>}
              </FormLabel>
            )}
            <div className={cn("relative flex items-center", {})}>
              <FormControl>
                <Textarea
                  {...props}
                  {...field}
                  onBlur={(e) => {
                    onBlurWorkaround(e);
                    if (autoTrim) {
                      field.onChange(e.target.value.trim());
                    }
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
            {description && !fieldState.error && <FormDescription>{description}</FormDescription>}
            {!hideErrorMessage && <FormMessage className={errorMessageClassName} />}
          </FormItem>
        );
      }}
    />
  );
}

export default TextareaField;
