import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-md justify-center whitespace-nowrap cursor-pointer text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
{
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        violetSelect: "bg-[#835BD2] font-semibold shadow-sm text-destructive-foreground hover:bg-purple-700 shadow-lg text-base text-white",
        cube: "bg-white border-purple-600 border-2 text-purple-600 font-bold shadow-md rounded-[3px] hover:bg-[#fff] cursor-pointer",
        info: "bg-white border-purple-600 border-[1px] rounded-full text-purple-700",
        shadow: "hover:bg-[#EFEEF3] bg-white text-lg flex justify-between",
        calendar: "bg-white rounded-lg border hover:bg-purple-300 hover:text-white",
        shadow2: "hover:bg-gray-300 bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center text-base",
        menu: "p-5 text-base font-semibold rounded-none hover:bg-gray-100",
        close: "bg-red-500 hover:bg-red-600 text-white text-3xl h-4 w-4 px-0 py-0 p-0"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 px-3",
        icon: "h-10 w-10",
        calendar: "h-[100px] w-[100px]"
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
