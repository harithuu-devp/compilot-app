import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { GlassCard, type GlassCardDelay } from "./GlassCard";
import { formatPercent } from "@/lib/utils";

export type StatTone = "blue" | "violet" | "cyan" | "lavender";

const TONE_GRADIENT: Record<StatTone, string> = {
  blue: "bg-gradient-primary",
  violet: "bg-gradient-secondary",
  cyan: "bg-gradient-info",
  lavender: "bg-gradient-lavender",
};

const TONE_GLOW: Record<StatTone, string> = {
  blue: "glow-blue",
  violet: "glow-violet",
  cyan: "glow-cyan",
  lavender: "glow-violet",
};

export type GlassStatCardProps = {
  label: string;
  value: string;
  change?: number;
  tone?: StatTone;
  icon: React.ReactNode;
  caption?: string;
  delay?: GlassCardDelay;
};

export function GlassStatCard({ label, value, change, tone = "blue", icon, caption, delay = 0 }: GlassStatCardProps) {
  const positive = (change ?? 0) >= 0;

  return (
    <GlassCard interactive delay={delay} className="group relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)]">{value}</p>
        </div>
        <span
          aria-hidden
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl text-white transition-glass",
            TONE_GRADIENT[tone],
            TONE_GLOW[tone],
          )}
        >
          {icon}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        {typeof change === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold",
              positive ? "text-[var(--success)]" : "text-[var(--danger)]",
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" aria-hidden /> : <ArrowDownRight className="size-3.5" aria-hidden />}
            {formatPercent(change)}
          </span>
        ) : null}
        {caption ? <span className="text-[var(--muted)]">{caption}</span> : null}
      </div>
    </GlassCard>
  );
}
