import { cn } from "cn";

/** Static width/height classes in 5% steps - keeps Tailwind able to see every value. */
const WIDTHS = [
  "w-[0%]",
  "w-[5%]",
  "w-[10%]",
  "w-[15%]",
  "w-[20%]",
  "w-[25%]",
  "w-[30%]",
  "w-[35%]",
  "w-[40%]",
  "w-[45%]",
  "w-[50%]",
  "w-[55%]",
  "w-[60%]",
  "w-[65%]",
  "w-[70%]",
  "w-[75%]",
  "w-[80%]",
  "w-[85%]",
  "w-[90%]",
  "w-[95%]",
  "w-[100%]",
] as const;

const HEIGHTS = [
  "h-[0%]",
  "h-[5%]",
  "h-[10%]",
  "h-[15%]",
  "h-[20%]",
  "h-[25%]",
  "h-[30%]",
  "h-[35%]",
  "h-[40%]",
  "h-[45%]",
  "h-[50%]",
  "h-[55%]",
  "h-[60%]",
  "h-[65%]",
  "h-[70%]",
  "h-[75%]",
  "h-[80%]",
  "h-[85%]",
  "h-[90%]",
  "h-[95%]",
  "h-[100%]",
] as const;

function toStep(value: number) {
  return Math.min(20, Math.max(0, Math.round(value / 5)));
}

export function percentWidthClass(value: number) {
  return WIDTHS[toStep(value)];
}

export function percentHeightClass(value: number) {
  return HEIGHTS[toStep(value)];
}

export type MeterTone = "blue" | "violet" | "cyan" | "lavender";

const TONES: Record<MeterTone, string> = {
  blue: "bg-gradient-primary",
  violet: "bg-gradient-secondary",
  cyan: "bg-gradient-info",
  lavender: "bg-gradient-lavender",
};

export type GlassMeterProps = {
  label: string;
  value: number;
  meta?: string;
  tone?: MeterTone;
  className?: string;
};

export function GlassMeter({ label, value, meta, tone = "blue", className }: GlassMeterProps) {
  return (
    <li className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="truncate text-[var(--text)]">{label}</span>
        <span className="shrink-0 text-xs text-[var(--muted)]">{meta ?? `${value}%`}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-tertiary)]">
        <div
          role="meter"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
          className={cn("h-full rounded-full transition-glass", TONES[tone], percentWidthClass(value))}
        />
      </div>
    </li>
  );
}
