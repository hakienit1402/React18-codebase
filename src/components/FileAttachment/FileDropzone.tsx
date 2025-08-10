import { UploadIcon } from "lucide-react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface FileDropzoneProps extends DropzoneOptions {
  textObject?: {
    label?: string;
    description?: string;
    buttonText?: string;
  };
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FileDropzone = ({
  textObject = {
    label: "Drop file here or",
    description: "Files has a maximum size of 10MB.",
    buttonText: "Choose file",
  },
  inputProps,
  ...dropzoneProps
}: FileDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropzoneProps,
  });
  return (
    <div
      className={cn(
        "flex h-full min-h-32 w-full flex-auto shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-neutral-dark-300 p-4 transition-colors",
        {
          "border-neutral-dark-600 bg-common-surface": isDragActive,
          "cursor-pointer hover:border-neutral-dark-500": !dropzoneProps.disabled,
          "bg-neutral-dark-200": dropzoneProps.disabled,
        },
      )}
      {...getRootProps()}
    >
      <input {...inputProps} {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-1 self-center">
        <div className="flex flex-wrap items-center justify-center space-x-1">
          <p className="text-sm text-neutral-light-500">
            {textObject?.label || "Drop file here or"}
          </p>
          <Button
            variant="tertiary"
            size="sm"
            className="h-4 px-1 text-sm hover:bg-transparent disabled:!bg-transparent [&>*]:flex [&>*]:items-center [&>*]:gap-2"
            disabled={dropzoneProps.disabled}
            role="button"
            form=""
          >
            <UploadIcon />
            {textObject?.buttonText || "Choose file"}
          </Button>
        </div>
        {textObject?.description && (
          <p className="text-xs text-neutral-light-700">{textObject?.description}</p>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
