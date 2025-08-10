import { Button, ButtonProps } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { cn } from "@/lib/utils";

interface DialogWrapperProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  wrapperClassName?: string;
  secondaryCTA?: ButtonProps & {
    visible: boolean;
  };
  primaryCTA?: ButtonProps & {
    visible: boolean;
  };
  buttonsComponent?: React.ReactNode;
  titleClassName?: string;
  classNameButtons?: string;
  children?: React.ReactNode;
}
export const DialogWrapper = ({
  open,
  setOpen,
  title,
  wrapperClassName,
  buttonsComponent,
  children,
  secondaryCTA = {
    visible: true,
    children: "Cancel",
    onClick: () => {},
  },
  primaryCTA = {
    visible: true,
    children: "Save",
    onClick: () => {},
  },
  titleClassName,
  classNameButtons,
}: DialogWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "flex h-auto max-h-screen min-h-64 w-[calc(100vw-72px)] max-w-full shrink-0 flex-col !gap-0 overflow-hidden rounded-xl bg-common-surface p-0 text-neutral-light-400 shadow-4dp mq1440:h-auto mq1440:max-w-1440 mq1920:h-auto mq1920:max-w-1440",
          wrapperClassName,
        )}
      >
        <DialogHeader className="border-b border-neutral-dark-300 p-4">
          {title && (
            <DialogTitle
              className={cn("text-base font-semibold text-neutral-light-100", titleClassName)}
            >
              {title}
            </DialogTitle>
          )}
        </DialogHeader>
        {children && children}

        <DialogFooter className={cn("mt-auto flex justify-end gap-2", classNameButtons)}>
          {!buttonsComponent && (
            <>
              {secondaryCTA.visible && (
                <Button variant="outline" onClick={secondaryCTA.onClick} {...secondaryCTA}>
                  {secondaryCTA.children}
                </Button>
              )}
              {primaryCTA.visible && (
                <Button variant="primary" onClick={primaryCTA.onClick} {...primaryCTA}>
                  {primaryCTA.children}
                </Button>
              )}
            </>
          )}
          {buttonsComponent && buttonsComponent}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
