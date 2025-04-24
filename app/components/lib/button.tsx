import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 aria-[invalid=true]:focus-visible:ring-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary",
        app: "bg-gradient-to-r from-purple-500 to-cyan-300 text-shadow text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 disabled:hover:bg-destructive",
        outline:
          "border border-black/55 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground disabled:hover:bg-background",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 disabled:hover:bg-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground disabled:hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-lg",
        xl: "h-14 rounded-md px-8 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
