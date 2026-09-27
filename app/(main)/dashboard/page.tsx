import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CreditCard,
  DollarSign,
  Globe2,
  MonitorSmartphone,
  MousePointerClick,
  Users,
} from "lucide-react";
import Link from "next/link";
import { GlassBadge, type GlassBadgeVariant } from "@/components/ui/GlassBadge";
import { GlassCard, staggerDelay } from "@/components/ui/GlassCard";
import { glassButtonStyles } from "@/components/ui/GlassButton";
import { GlassMeter, percentHeightClass } from "@/components/ui/GlassMeter";
import { GlassStatCard } from "@/components/ui/GlassStatCard";
import {
  APP_NAME,
  BROWSERS,
  COUNTRIES,
  DASHBOARD_STATS,
  DEVICES,
  SOURCES,
  TOP_PAGES,
  TRAFFIC_SERIES,
  TRANSACTIONS,
  UPCOMING_EVENTS,
} from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Traffic, revenue and engagement analytics for your workspace.",
};

const STAT_ICONS = [DollarSign, Users, Activity, MousePointerClick];

const STATUS_VARIANTS: Record<(typeof TRANSACTIONS)[number]["status"], GlassBadgeVariant> = {
  paid: "success",
  pending: "warning",
  refunded: "danger",
};

function SectionHeading({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--text)]">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function DashboardPage() {
  const peak = Math.max(...TRAFFIC_SERIES.map((point) => point.value));

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <section className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <GlassBadge variant="info">Live workspace</GlassBadge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)]">
            Welcome back, Ava
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {APP_NAME} summary for the last 7 days · {formatDate(new Date())}
          </p>
        </div>
        <Link href="/projects/create" className={glassButtonStyles({})}>
          Create project
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <section aria-label="Key metrics" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat, index) => {
          const Icon = STAT_ICONS[index] ?? Activity;
          return (
            <GlassStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              tone={stat.tone}
              caption="vs last week"
              icon={<Icon className="size-5" aria-hidden />}
              delay={staggerDelay(index)}
            />
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <GlassCard delay={1} className="flex flex-col gap-6">
          <SectionHeading
            title="Traffic"
            description="Sessions per day"
            action={<GlassBadge variant="success">+18.2%</GlassBadge>}
          />
          <div className="flex h-56 items-end gap-3" role="img" aria-label="Weekly sessions bar chart">
            {TRAFFIC_SERIES.map((point) => (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-44 w-full items-end rounded-2xl bg-[var(--surface-tertiary)] p-1">
                  <div
                    className={cn("w-full rounded-xl bg-gradient-primary transition-glass", percentHeightClass((point.value / peak) * 100))}
                    title={`${point.label}: ${point.value}k sessions`}
                  />
                </div>
                <span className="text-xs text-[var(--muted)]">{point.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={2} className="flex flex-col gap-6">
          <SectionHeading title="Top pages" description="Most visited routes" />
          <ul className="flex flex-col gap-5">
            {TOP_PAGES.map((row, index) => (
              <GlassMeter
                key={row.label}
                label={row.label}
                value={row.value}
                meta={row.meta}
                tone={index % 2 === 0 ? "blue" : "violet"}
              />
            ))}
          </ul>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard delay={1} className="flex flex-col gap-6">
          <SectionHeading title="Devices" description="Share of sessions" />
          <ul className="flex flex-col gap-5">
            {DEVICES.map((row) => (
              <GlassMeter key={row.label} label={row.label} value={row.value} meta={row.meta} tone="cyan" />
            ))}
          </ul>
        </GlassCard>

        <GlassCard delay={2} className="flex flex-col gap-6">
          <SectionHeading title="Browsers" description="Client breakdown" />
          <ul className="flex flex-col gap-5">
            {BROWSERS.map((row) => (
              <GlassMeter key={row.label} label={row.label} value={row.value} meta={row.meta} tone="lavender" />
            ))}
          </ul>
        </GlassCard>

        <GlassCard delay={3} className="flex flex-col gap-6">
          <SectionHeading title="Countries" description="Where users sign in from" />
          <ul className="flex flex-col gap-5">
            {COUNTRIES.map((row) => (
              <GlassMeter key={row.label} label={row.label} value={row.value} meta={row.meta} tone="violet" />
            ))}
          </ul>
          <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <Globe2 className="size-4" aria-hidden />
            Tracking 42 countries in total
          </p>
        </GlassCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <GlassCard delay={1} className="flex flex-col gap-6">
          <SectionHeading
            title="Transactions"
            description="Latest activity across all plans"
            action={
              <Link href="/projects" className={glassButtonStyles({ variant: "ghost", size: "sm" })}>
                View all
              </Link>
            }
          />

          <div className="hidden overflow-hidden rounded-2xl md:block">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">Latest transactions</caption>
              <thead>
                <tr className="text-left text-xs tracking-wide text-[var(--muted)] uppercase">
                  <th scope="col" className="px-4 py-3 font-medium">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Plan
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-[var(--glass-border)] text-[var(--text)]">
                    <td className="px-4 py-3 font-medium">{transaction.customer}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{transaction.plan}</td>
                    <td className="px-4 py-3">{formatCurrency(transaction.amount)}</td>
                    <td className="px-4 py-3">
                      <GlassBadge variant={STATUS_VARIANTS[transaction.status]}>{transaction.status}</GlassBadge>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{formatDate(transaction.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="flex flex-col gap-3 md:hidden">
            {TRANSACTIONS.map((transaction) => (
              <li key={transaction.id} className="glass glass-border rounded-2xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-[var(--text)]">{transaction.customer}</span>
                  <GlassBadge variant={STATUS_VARIANTS[transaction.status]}>{transaction.status}</GlassBadge>
                </div>
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  {transaction.plan} · {formatCurrency(transaction.amount)} · {formatDate(transaction.date)}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="flex flex-col gap-6">
          <GlassCard delay={2} className="flex flex-col gap-6">
            <SectionHeading title="Calendar" description="Next scheduled work" />
            <ul className="flex flex-col gap-4">
              {UPCOMING_EVENTS.map((event) => (
                <li key={event.label} className="flex items-center gap-4">
                  <span className="glass glass-border flex size-12 shrink-0 flex-col items-center justify-center rounded-2xl text-[11px] leading-tight text-[var(--text-secondary)]">
                    <CalendarDays className="size-3.5" aria-hidden />
                    {event.date}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-[var(--text)]">{event.label}</span>
                    <span className="block text-xs text-[var(--muted)]">{event.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard delay={3} className="flex flex-col gap-6">
            <SectionHeading title="Sources" description="Acquisition mix" />
            <ul className="flex flex-col gap-5">
              {SOURCES.map((row) => (
                <GlassMeter key={row.label} label={row.label} value={row.value} meta={row.meta} tone="blue" />
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Payment success", value: "99.4%", Icon: CreditCard, tone: "text-[var(--success)]" },
          { label: "Avg. session", value: "4m 12s", Icon: MonitorSmartphone, tone: "text-[var(--info)]" },
          { label: "Churn risk", value: "1.2%", Icon: Activity, tone: "text-[var(--warning)]" },
        ].map((item, index) => (
          <GlassCard key={item.label} interactive delay={staggerDelay(index)} className="flex items-center gap-4">
            <span className={cn("glass glass-border flex size-11 items-center justify-center rounded-2xl", item.tone)}>
              <item.Icon className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-[var(--muted)]">{item.label}</span>
              <span className="block text-lg font-semibold text-[var(--text)]">{item.value}</span>
            </span>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
