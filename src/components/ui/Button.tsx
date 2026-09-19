import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-nav transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Warm Cream filled — Enquire, Submit, Book on dark base */
        primary: "bg-cream text-base hover:bg-cream/90",
        /** Warm Cream outlined — View Story, Our Work */
        secondary:
          "border border-cream bg-transparent text-cream hover:bg-cream/10",
        /** Soft Ink outline — for use on Cool Mist / Warm Sheet bands */
        ink: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-cream",
        ghost: "bg-transparent text-cream hover:text-blush",
      },
      size: {
        default: "px-7 py-3",
        sm: "px-5 py-2",
        lg: "px-9 py-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

export { buttonVariants };
