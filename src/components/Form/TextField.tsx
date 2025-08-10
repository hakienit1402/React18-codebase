import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeClosed, Loader2Icon, LockIcon } from "lucide-react";
import { ComponentProps, useState } from "react";
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
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";

interface TextFieldProps extends CommonFieldProps {
  hasIconBlock?: boolean;
  isLoading?: boolean;
  autoTrim?: boolean;
  type?: string;
}

function TextField<
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
  hasIconBlock,
  hideErrorMessage,
  autoTrim,
  isLoading,
  description,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  TextFieldProps &
  ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);
  const { control: controlContext } = useFormContext<TFieldValues, TName>();
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

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ field, fieldState }) => {
        const isHasEndAdornment =
          props.type === "password" ||
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
                <Input
                  {...props}
                  {...field}
                  type={
                    props.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : props.type
                  }
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
                        {props.type === "password" && (
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-neutral-light-500"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            whileFocus={{ scale: 1.05 }}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {showPassword ? (
                                <motion.div
                                  key="eyeClosed"
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.6 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <EyeClosed className="h-5 w-5" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="eye"
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.6 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Eye className="h-5 w-5" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        )}

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

export default TextField;
