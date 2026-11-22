import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary gradient-primary text-white hover:bg-primary/90 border-transparent",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-blue-soft badge-hero-primary  hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        popular: "bg-primary text-white hover:bg-primary/90",
        normal: "bg-blue-soft badge-hero-primary",
        web: "gradient-primary hover-primary text-white border-transparent",
        common: "bg-transparent border border-white",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  path?: string;
  shadowColor?: string;
  arrow?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  path,
  onClick,
  shadowColor,
  arrow = false,
  children,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (path) {
      navigate(path);
    }
    onClick?.(e);
  };

  const isDefaultVariant = variant === "default" || !variant;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "group",
        isDefaultVariant &&
        "shadow-[0_0_0_2px_var(--btn-shadow),0_0_0_calc(2px+2px)_rgb(var(--shadow-green)/50%),1px_-6px_transparent] hover:shadow-none",
        // Modified Logic:
        isDefaultVariant && (
          shadowColor
            ? "[--btn-shadow:var(--white)] dark:[--btn-shadow:var(--custom-shadow)]"
            : "[--btn-shadow:var(--white)] dark:[--btn-shadow:var(--black)]"
        )
      )}
      onClick={handleClick}
      style={
        isDefaultVariant && shadowColor
          ? ({ ...style, "--custom-shadow": shadowColor } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {children}
      {!asChild && arrow && (
        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
      )}
    </Comp>
  );
}

export { Button, buttonVariants };