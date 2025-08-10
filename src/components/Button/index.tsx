import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";

import LoadingDots from "@/components/Motions/LoadingDots";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex relative cursor-pointer items-center justify-center overflow-hidden gap-1.5 p-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors  disabled:pointer-events-auto disabled:text-neutral-dark-600 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-neutral-dark-100 hover:bg-primary-400 focus:bg-primary-300 disabled:bg-neutral-light-1000",
        secondary:
          "border border-neutral-dark-400 text-primary-500 active:text-primary-500 hover:bg-neutral-dark-500 focus:bg-neutral-dark-600 focus:text-primary-300 disabled:bg-neutral-light-1000",
        tertiary:
          "text-primary-500 active:text-primary-500 hover:bg-neutral-dark-500 focus:bg-neutral-dark-600 focus:text-primary-300 disabled:bg-neutral-light-1000",
        outline:
          "border border-neutral-dark-400 text-primary-500 active:text-primary-500 hover:bg-neutral-dark-500 focus:bg-neutral-dark-600 focus:text-primary-300 disabled:text-neutral-light-1000 disabled:border-neutral-dark-300",
        ghost:
          "text-primary-500 bg-transparent active:text-primary-500 hover:bg-neutral-dark-500 disabled:bg-neutral-light-1000",
      },
      size: {
        default: "h-[42px] rounded-md p-3",
        sm: "h-[34px] rounded-md px-3 text-sm",
        lg: "h-[42px] rounded-md p-3",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  duration?: string;
  isLoading?: boolean;
}

export type ButtonVariantProps =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost";
export type ButtonSizeProps = "default" | "sm" | "lg" | "icon";

const RIPPLE_COLOR: Record<ButtonVariantProps, string> = {
  primary: "rgba(255, 255, 255, 0.2)",
  secondary: "rgba(49, 48, 54, 0.5)",
  tertiary: "rgba(49, 48, 54, 0.5)",
  outline: "rgba(49, 48, 54, 0.5)",
  ghost: "rgba(49, 48, 54, 0.5)",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      asChild = false,
      onClick,
      duration = "600ms",
      isLoading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const [buttonRipples, setButtonRipples] = React.useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);
    const [isClicked, setIsClicked] = React.useState(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      setIsClicked(true);
      onClick?.(event);
    };
    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, key: Date.now() };
      setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };
    React.useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1];
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key),
          );
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [buttonRipples, duration]);

    React.useEffect(() => {
      if (isClicked) {
        const timeout = setTimeout(() => {
          setIsClicked(false);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }, [isClicked]);

    const rippleColor = RIPPLE_COLOR[variant ?? "primary"];

    return (
      <Comp
        onClick={handleClick}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <LoadingDots />
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isClicked ? 0.95 : 1 }}
            transition={{
              type: "spring",
              duration: 0.1,
              bounce: 0.1,
            }}
            className="flex"
          >
            {children}
          </motion.div>
        )}
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="absolute animate-rippling rounded-full opacity-30"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: `scale(0)`,
              }}
            />
          ))}
        </span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
