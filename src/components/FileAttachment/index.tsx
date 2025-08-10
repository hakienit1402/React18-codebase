import { ForwardedRef, forwardRef, useCallback, useRef } from "react";
import { Accept, FileRejection } from "react-dropzone";
import { FieldError } from "react-hook-form";

import FileDropzone from "@/components/FileAttachment/FileDropzone";
import FileUploaded from "@/components/FileAttachment/FileUploaded";

export const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024; // 10MB

interface FileAttachmentProps {
  textObject?: {
    label?: string;
    description?: string;
    buttonText?: string;
    mimeTypeAllowed?: string;
    maxSizeText?: string;
  };
  disabled?: boolean;
  maxSizeInBytes?: number;
  allowType?: Accept | null;
  onChange?: (
    file: File | undefined,
    status?: { isRejected?: boolean; errors?: string[] },
  ) => void;
  value?: File | undefined;
  errorField?: FieldError | undefined;
  clearErrors?: () => void;
}

const FileAttachment = forwardRef<HTMLDivElement, FileAttachmentProps>(
  (
    {
      textObject,
      disabled,
      maxSizeInBytes,
      allowType,
      onChange,
      value,
      errorField,
      clearErrors,
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const controllerRef = useRef(new AbortController());

    const onDrop = useCallback(
      async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
          const errors = fileRejections.at(0)?.errors;
          const rejectedFile = fileRejections.at(0)?.file;

          if (Array.isArray(errors) && errors?.length > 0) {
            const errorMessages = errors.map((error) => error.code);
            if (rejectedFile) {
              onChange?.(rejectedFile, {
                isRejected: true,
                errors: errorMessages,
              });
            }
          }
          return;
        }
        const file = acceptedFiles.at(0);
        if (file) {
          onChange?.(file, { isRejected: false });
        }
      },
      [onChange],
    );

    const onRemove = () => {
      controllerRef.current.abort();
      if (errorField !== undefined) {
        clearErrors?.();
      }
      onChange?.(undefined, { isRejected: false });
      controllerRef.current = new AbortController();
    };

    return (
      <div ref={ref} className="flex w-full flex-col gap-2">
        <FileDropzone
          disabled={disabled}
          textObject={textObject}
          onDrop={onDrop}
          accept={allowType || undefined}
          maxSize={maxSizeInBytes || MAX_SIZE_IN_BYTES}
        />
        <FileUploaded file={value} onRemove={onRemove} />
      </div>
    );
  },
);

FileAttachment.displayName = "FileAttachment";

export default FileAttachment;
