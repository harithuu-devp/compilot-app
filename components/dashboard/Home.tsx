import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/dashboard/StatCard";

const projects = [
  {
    name: "Aurora Product Launch",
    agency: "Northstar Creative",
    status: "Planning",
    date: "Sep 24",
  },
  {
    name: "Summit 2026",
    agency: "Axis Events",
    status: "Awarded",
    date: "Oct 08",
  },
  {
    name: "Founders Dinner",
    agency: "Meridian",
    status: "Proposal",
    date: "Oct 15",
  },
];
const events = [
  { title: "Venue walkthrough", time: "Today · 3:00 PM" },
  { title: "Vendor confirmation", time: "Tomorrow · 10:30 AM" },
  { title: "Production review", time: "Fri · 2:00 PM" },
];
export function Home({ name }: { name: string }) {
  return (
    <div className="space-y-6">
      <GlassCard className="overflow-hidden p-6 sm:p-8">
        <p className="eyebrow">Operations overview</p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back, {name}
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Your event portfolio is moving with purpose.
            </p>
          </div>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-medium text-[var(--accent)]">
            September 2026
          </span>
        </div>
      </GlassCard>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Projects"
          value="12"
          detail="2 starting this month"
        />
        <StatCard label="Upcoming Events" value="4" detail="Next: Sep 24" />
        <StatCard label="Pending Tasks" value="18" detail="5 high priority" />
        <StatCard label="Completed Projects" value="28" detail="This year" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.35fr_.85fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Recent projects</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Latest portfolio activity
              </p>
            </div>
            <a
              className="text-sm font-medium text-[var(--accent)]"
              href="/projects"
            >
              View all
            </a>
          </div>
          <div className="mt-5 divide-y divide-[var(--line)]">
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between gap-3 py-4"
              >
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {project.agency}
                  </p>
                </div>
                <div className="text-right">
                  <span className="status-pill">{project.status}</span>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {project.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-semibold">Upcoming events</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Keep delivery on schedule
          </p>
          <div className="mt-5 space-y-4">
            {events.map((event) => (
              <div className="flex gap-3" key={event.title}>
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
