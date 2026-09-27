import { forwardRef } from "react";
import { cn } from "cn";
import { LoadingSpinner } from "./LoadingSpinner";

export type GlassButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type GlassButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-glass outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<GlassButtonVariant, string> = {
  primary: "bg-gradient-primary text-white glow-blue hover:-translate-y-0.5",
  secondary:
    "glass glass-border text-[var(--text)] hover:bg-[var(--surface-hover)] hover:border-[var(--glass-border-strong)] hover:-translate-y-0.5",
  ghost: "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]",
  danger: "bg-[var(--danger)] text-white hover:-translate-y-0.5",
};

const SIZES: Record<GlassButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function glassButtonStyles(options: { variant?: GlassButtonVariant; size?: GlassButtonSize; fullWidth?: boolean; className?: string } = {}) {
  const { variant = "primary", size = "md", fullWidth = false, className } = options;
  return cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);
}

export type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(function GlassButton(
  { variant = "primary", size = "md", fullWidth = false, isLoading = false, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? "button"}
      disabled={disabled || isLoading}
      className={glassButtonStyles({ variant, size, fullWidth, className })}
      {...rest}
    >
      {isLoading ? <LoadingSpinner size="sm" label="Working" /> : null}
      {children}
    </button>
  );
});
