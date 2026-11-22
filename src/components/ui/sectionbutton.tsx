import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "./utils";
import { useNavigate, useInRouterContext } from "react-router-dom";

const aVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap theme-button text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary gradient-primary text-white hover:bg-primary/90 border-transparent py-2 px-6",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        primaryoutline:
          "primaryoutline border-primary text-primary border bg-background dark:bg-input/30",
       
          secondary: "bg-blue-soft badge-hero-primary hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        popular: "primary-button text-white",
        normal: "bg-blue-soft badge-hero-primary",
        web: "gradient-primary hover-primary text-white border-transparent",
        common: "bg-transparent border border-white text-white",
      },
      size: {
        default: "h-9 px-6 py-2 has-[>svg]:px-3",
        sm: "h-8 theme-button gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 theme-button px-6 has-[>svg]:px-4",
        icon: "size-9 theme-button",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof aVariants> {
  asChild?: boolean;
  path?: string;
  shadowColor?: string;
  arrow?: boolean;
}

function SectionButton({
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
  href,
  ...props
}: AProps) {
  const Comp = asChild ? Slot : "a";

const isInRouter = useInRouterContext();
const navigate = isInRouter ? useNavigate() : null;

  const isDefaultVariant = variant === "default" || !variant;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (path) {
      e.preventDefault();
      if (navigate) {
        navigate(path);
      } else {
        window.location.href = path;
      }
    }
    onClick?.(e);
  };

  return (
    <Comp
      data-slot="a"
      href={path || href || "#"}
      className={cn(
        aVariants({ variant, size, className }),
        "group",
        isDefaultVariant &&
          "",
        isDefaultVariant &&
          (shadowColor
            ? "[--btn-shadow:var(--white)] dark:[--btn-shadow:var(--custom-shadow)]"
            : "[--btn-shadow:var(--white)] dark:[--btn-shadow:var(--black)]")
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

export { SectionButton, aVariants };
