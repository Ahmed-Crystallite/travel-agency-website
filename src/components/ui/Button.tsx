import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-gold-400 text-ink-950 hover:bg-gold-300",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  light: "border border-white/30 text-white backdrop-blur-sm hover:bg-white/10",
  outline: "border border-ink-900/15 text-ink-900 hover:border-ink-900/40 hover:bg-white",
};

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

interface ButtonStyleOptions {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

export const buttonStyles = ({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}) =>
  cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:pointer-events-none disabled:opacity-70",
    variants[variant],
    sizes[size],
    className,
  );

type ButtonProps = ComponentProps<"button"> & Omit<ButtonStyleOptions, "className">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
