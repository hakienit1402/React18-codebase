import { motion } from "framer-motion";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, onClick, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("group flex items-center gap-2", className)}
    onClick={onClick}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  const showFakeCaret = hasFakeCaret || (isActive && char);
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-md border text-sm text-neutral-300 shadow-sm transition-all",
        showFakeCaret ? "border-primary-500" : "border-common-outline",
        className,
      )}
      {...props}
    >
      {char}
      {showFakeCaret && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center",
            {
              "right-px": !!char,
            },
          )}
        >
          <motion.div
            className={cn("h-4 w-px bg-primary-100", {
              "translate-x-1.5": !!char, // shift caret right when char exists
            })}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
