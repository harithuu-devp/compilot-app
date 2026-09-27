import { cn } from "cn";

/** Stagger step for the fade-up entrance, 0 renders immediately. */
export type GlassCardDelay = 0 | 1 | 2 | 3 | 4 | 5;

const DELAY_CLASS: Record<GlassCardDelay, string> = {
  0: "",
  1: "fade-up-1",
  2: "fade-up-2",
  3: "fade-up-3",
  4: "fade-up-4",
  5: "fade-up-5",
};

/** Clamps an arbitrary index into a valid stagger step. */
export function staggerDelay(index: number): GlassCardDelay {
  return Math.min(5, Math.max(0, Math.round(index))) as GlassCardDelay;
}

export type GlassCardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Enables the lift on hover. */
  interactive?: boolean;
  /** Stagger offset for the fade-up entrance. */
  delay?: GlassCardDelay;
  /** Applies the denser panel surface used for toolbars and forms. */
  panel?: boolean;
  padded?: boolean;
};

export function GlassCard({
  interactive = false,
  delay = 0,
  panel = false,
  padded = true,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "animate-fade-up",
        DELAY_CLASS[delay],
        panel ? "glass-panel" : "glass",
        "rounded-3xl",
        padded && "p-6",
        interactive && "glass-hover transition-glass cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
