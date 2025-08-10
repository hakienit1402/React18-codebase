import { ComponentProps, useEffect, useRef } from "react";
import { FieldPath, FieldValues, UseControllerProps, useFormContext } from "react-hook-form";

import FileAttachment from "../FileAttachment";
import { CommonFieldProps } from "./form.type";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import { ERROR_MESSAGES_CODE } from "@/constants/error-codes";
import { cn } from "@/lib/utils";

interface FileAttachmentFieldProps extends CommonFieldProps {
  isLoading?: boolean;
  extendOnchange?: (file: File | undefined) => void;
}
interface HTMLDivElementWithFocus extends HTMLDivElement {
  focusInput?: () => void;
}

function FileAttachmentField<
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
  extendOnchange,
  name,
  textObject,
  maxSizeInBytes,
  allowType,
}: UseControllerProps<TFieldValues, TName> &
  FileAttachmentFieldProps &
  ComponentProps<typeof FileAttachment>) {
  const {
    control: controlContext,
    setError,
    clearErrors,
    formState,
  } = useFormContext<TFieldValues, TName>();
  const fileAttachmentRef = useRef<HTMLDivElementWithFocus>(null);

  useEffect(() => {
    const errors = formState.errors;
    if (Object.keys(errors).length === 1 && errors[name] && fileAttachmentRef.current) {
      fileAttachmentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formState, name]);

  return (
    <FormField
      control={control || controlContext}
      name={name}
      render={({ fieldState, field }) => {
        return (
          <FormItem className={formItemClassName}>
            {label && (
              <FormLabel className={labelClassName}>
                {label} {hasAsterisk && <span className="ml-1 text-semantics-red-500">*</span>}
              </FormLabel>
            )}
            <div className={cn("relative flex items-center", {})}>
              <FormControl>
                <FileAttachment
                  ref={fileAttachmentRef}
                  value={field.value}
                  onChange={(file, status) => {
                    if (status && status?.isRejected) {
                      setError(name, {
                        message:
                          status?.errors?.map((error) => {
                            switch (error) {
                              case ERROR_MESSAGES_CODE.UPLOAD_ERROR.FILE_TOO_LARGE:
                                return `Upload failed. Please make sure it does not exceed maximum size of ${textObject?.maxSizeText || "10MB"}.`;
                              case ERROR_MESSAGES_CODE.UPLOAD_ERROR.FILE_INVALID_TYPE:
                                return "Invalid data format!";
                              case ERROR_MESSAGES_CODE.UPLOAD_ERROR.FILE_TOO_MANY:
                                return "Invalid data format!";
                              default:
                                return "";
                            }
                          })?.[0] || "Invalid data format!",
                        type: "custom",
                      });
                    } else clearErrors(name);
                    field.onChange(file);
                    extendOnchange?.(file);
                  }}
                  textObject={textObject}
                  maxSizeInBytes={maxSizeInBytes}
                  allowType={allowType}
                  errorField={fieldState.error}
                  clearErrors={() => {
                    clearErrors(name);
                  }}
                />
              </FormControl>
            </div>
            {description && !fieldState.error && <FormDescription>{description}</FormDescription>}
            {!hideErrorMessage && (
              <FormMessage ref={fileAttachmentRef} className={errorMessageClassName} />
            )}
          </FormItem>
        );
      }}
    />
  );
}

export default FileAttachmentField;
