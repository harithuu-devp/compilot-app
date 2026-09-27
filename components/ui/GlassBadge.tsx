import { cn } from "cn";

export type GlassBadgeVariant = "success" | "warning" | "danger" | "info" | "purple";
export type GlassBadgeSize = "sm" | "md";

const VARIANTS: Record<GlassBadgeVariant, string> = {
  success: "bg-gradient-success",
  warning: "bg-gradient-warning",
  danger: "bg-gradient-danger",
  info: "bg-gradient-info",
  purple: "bg-gradient-secondary",
};

const SIZES: Record<GlassBadgeSize, string> = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
};

export type GlassBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: GlassBadgeVariant;
  size?: GlassBadgeSize;
  icon?: React.ReactNode;
};

export function GlassBadge({ variant = "info", size = "sm", icon, className, children, ...rest }: GlassBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide text-white",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
