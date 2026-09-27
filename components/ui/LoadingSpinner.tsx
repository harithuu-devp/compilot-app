import { cn } from "cn";

const SIZES = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-[3px]",
} as const;

export type LoadingSpinnerProps = {
  size?: keyof typeof SIZES;
  label?: string;
  className?: string;
};

export function LoadingSpinner({ size = "md", label = "Loading", className }: LoadingSpinnerProps) {
  return (
    <span role="status" aria-live="polite" className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className={cn(
          "animate-spin-slow rounded-full border-[var(--glass-border)] border-t-[var(--primary)]",
          SIZES[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
