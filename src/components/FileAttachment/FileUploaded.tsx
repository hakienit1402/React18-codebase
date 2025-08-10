import { FileIcon, X } from "lucide-react";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

interface FileUploadedProps {
  file: File | undefined;
  onRemove?: () => void;
  className?: string;
  isError?: boolean;
}
const FileUploaded = ({
  file,
  className,
  isError = false,
  onRemove,
}: FileUploadedProps) => {
  if (!file) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg bg-common-surfaceOverlay px-4 py-3 text-base text-neutral-light-500",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <FileIcon
            className={cn("h-5 w-5", { "text-semantics-red-500": isError })}
          />
          <p className={cn({ "text-semantics-red-500": isError })}>
            {file.name}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {onRemove && (
            <Button onClick={onRemove} variant="ghost" size="icon">
              <X />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUploaded;
