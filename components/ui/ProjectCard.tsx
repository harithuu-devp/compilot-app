import { GlassCard } from "@/components/ui/GlassCard";

export type ProjectDisplay = {
  _id: { toString(): string };
  name: string;
  agency: string;
  description: string;
  venue: string;
  startDate: Date;
  endDate: Date;
  status: string;
};
export function ProjectCard({ project }: { project: ProjectDisplay }) {
  const start = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(project.startDate));
  const end = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(project.endDate));
  return (
    <GlassCard className="p-5 transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--accent)]">
            {project.agency}
          </p>
          <h2 className="mt-2 text-lg font-semibold">{project.name}</h2>
        </div>
        <span className="status-pill">{project.status.replace("_", " ")}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
        {project.description}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-4 text-xs">
        <div>
          <p className="text-[var(--muted)]">Venue</p>
          <p className="mt-1 font-medium">{project.venue}</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Event dates</p>
          <p className="mt-1 font-medium">
            {start} – {end}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
