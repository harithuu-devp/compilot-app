"use client";

import { useState, useMemo } from "react";
import { GlassBadge, type GlassBadgeVariant } from "@/components/ui/GlassBadge";
import { GlassCard, staggerDelay } from "@/components/ui/GlassCard";
import { glassButtonStyles } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassSelect } from "@/components/ui/GlassSelect";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/lib/constants";
import { FolderKanban, Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";
import { formatDate } from "@/lib/utils";

const STATUS_VARIANTS: Record<Project["status"], GlassBadgeVariant> = {
  active: "success",
  draft: "warning",
  archived: "info",
};

const TONE_GRADIENT: Record<Project["accent"], string> = {
  blue: "bg-gradient-primary",
  violet: "bg-gradient-secondary",
  cyan: "bg-gradient-info",
  lavender: "bg-gradient-success",
};

const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  ...PROJECT_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  })),
];

const SORT_OPTIONS = [
  { value: "updated", label: "Recently updated" },
  { value: "name", label: "Name (A–Z)" },
  { value: "members", label: "Most members" },
];

export default function ProjectList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>("updated");

  const projects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = PROJECTS.filter((project) => {
      const matchesQuery =
        !needle ||
        project.name.toLowerCase().includes(needle) ||
        project.description.toLowerCase().includes(needle);
      const matchesCategory =
        !category || category === "all" || project.category === category;
      return matchesQuery && matchesCategory;
    });

    return filtered.toSorted((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "members") return b.members - a.members;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [category, query, sort]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <section className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <GlassBadge variant="purple">Workspace</GlassBadge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)]">
            Projects
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {projects.length} of {PROJECTS.length} projects match your filters.
          </p>
        </div>
      </section>

      <GlassCard panel className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <GlassInput
          label="Search"
          name="project-search"
          placeholder="Search by name or description"
          icon={<Search className="size-4" aria-hidden />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          containerClassName="lg:flex-1"
        />
        <GlassSelect
          label="Category"
          aria-label="Filter by category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
          className="lg:w-52"
        />
        <GlassSelect
          label="Sort"
          aria-label="Sort projects"
          options={SORT_OPTIONS}
          value={sort}
          onChange={setSort}
          className="lg:w-52"
        />
        <Link
          href="/projects/create"
          className={glassButtonStyles({ className: "shrink-0" })}
        >
          <Plus className="size-4" aria-hidden />
          Create project
        </Link>
      </GlassCard>

      <section
        aria-label="Project list"
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <Link
          href="/projects/create"
          className="glass glass-border group flex min-h-52 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-6 text-center transition-glass hover:border-[var(--glass-border-strong)] hover:bg-[var(--surface-hover)] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
        >
          <span className="bg-gradient-primary flex size-12 items-center justify-center rounded-2xl text-white glow-blue transition-glass group-hover:-translate-y-0.5">
            <Plus className="size-6" aria-hidden />
          </span>
          <span className="text-sm font-medium text-[var(--text)]">
            Create project
          </span>
          <span className="text-xs text-[var(--muted)]">
            Start from a template or a blank canvas
          </span>
        </Link>

        {projects.map((project, index) => (
          <GlassCard
            key={project.id}
            interactive
            delay={staggerDelay(index)}
            className="flex min-h-52 flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <span
                aria-hidden
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl text-white",
                  TONE_GRADIENT[project.accent],
                )}
              >
                <FolderKanban className="size-5" />
              </span>
              <GlassBadge variant={STATUS_VARIANTS[project.status]}>
                {project.status}
              </GlassBadge>
            </div>

            <h2 className="mt-5 text-base font-semibold text-[var(--text)]">
              {project.name}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-secondary)]">
              {project.description}
            </p>

            <div className="mt-auto flex items-center justify-between pt-5 text-xs text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5" aria-hidden />
                {project.members} members
              </span>
              <span>{formatDate(project.updatedAt)}</span>
            </div>
          </GlassCard>
        ))}
      </section>

      {projects.length === 0 ? (
        <GlassCard className="text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            No projects match “{query}”. Try another search.
          </p>
        </GlassCard>
      ) : null}
    </div>
  );
}
