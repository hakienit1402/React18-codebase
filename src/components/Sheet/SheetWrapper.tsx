import { Button } from "@/components/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";

interface SheetWrapperProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  headerTitle?: string;
  actionText?: string;
  formId?: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
}
export const SheetWrapper = ({
  open,
  setOpen,
  formId,
  children,
  headerTitle,
  actionText,
  loading,
  variant,
}: SheetWrapperProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetDescription />
      <SheetContent className="flex h-full min-w-[489px] flex-col rounded-r-none">
        <SheetHeader className="h-[50px] border-b border-neutral-dark-300 p-4">
          {headerTitle && <SheetTitle className="leading-5">{headerTitle}</SheetTitle>}
        </SheetHeader>
        <div className="h-[calc(100vh-100px)] overflow-y-auto pb-8 pt-4">{children}</div>
        {actionText && (
          <SheetFooter className="h-[50px] border-t border-neutral-dark-300 px-4 py-2">
            <Button
              data-testid="form-submit-button"
              form={formId}
              type="submit"
              className="w-full"
              size="sm"
              isLoading={loading}
              {...(variant && { variant })}
            >
              {actionText}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
