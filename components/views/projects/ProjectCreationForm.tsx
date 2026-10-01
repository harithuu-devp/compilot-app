"use client";

import { useActionState, useState } from "react";
import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { GlassButton, glassButtonStyles } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassCheckbox } from "@/components/ui/GlassCheckbox";
import { GlassDatePicker } from "@/components/ui/GlassDatePicker";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassRadioGroup } from "@/components/ui/GlassRadioGroup";
import { GlassSearchSelect } from "@/components/ui/GlassSearchSelect";
import { GlassSelect } from "@/components/ui/GlassSelect";
import { GlassTextarea } from "@/components/ui/GlassTextarea";
import { GlassTimePicker } from "@/components/ui/GlassTimePicker";
import { GlassSelectAutocomplete } from "@/components/ui/GlassSelectAutocomplete";
import { INITIAL_PROJECT_STATE } from "@/services/project copy/form-state";
import { createProject } from "@/services/project copy/actions";
import {
  FEATURE_OPTIONS,
  MEMBER_OPTIONS,
  PROJECT_CATEGORIES,
  PROJECT_TEMPLATES,
  VISIBILITY_OPTIONS,
} from "@/lib/constants";
const CATEGORY_OPTIONS = PROJECT_CATEGORIES.map((category) => ({ value: category, label: category }));

export default function ProjectCreationForm() {
  const [state, formAction, isPending] = useActionState(
    createProject,
    INITIAL_PROJECT_STATE,
  );
  const [category, setCategory] = useState<string | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="animate-fade-up">
          <GlassBadge variant="info">New project</GlassBadge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text)]">Create project</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Name the project, pick a template and decide who gets access.
          </p>
        </section>
  
        <form action={formAction} className="flex flex-col gap-6">
          <GlassCard delay={1} className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">Basics</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">How the project appears across the workspace.</p>
            </div>
  
            <GlassInput
              label="Project name"
              name="name"
              placeholder="Aurora Analytics"
              required
              minLength={3}
              maxLength={60}
              autoComplete="off"
            />
  
            <GlassTextarea
              label="Description"
              name="description"
              placeholder="What is this project for?"
              maxLength={240}
              description="Up to 240 characters. Shown on the project card."
            />
  
            <GlassInput
              label="Tags"
              name="tags"
              placeholder="analytics, growth, dashboard"
              description="Comma separated. Maximum 8 tags."
            />
          </GlassCard>
  
          <GlassCard delay={2} className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">Setup</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Category, template, schedule and visibility.
              </p>
            </div>
  
            <div className="grid gap-5 md:grid-cols-2">
              <GlassSelectAutocomplete
                label="Category"
                placeholder="Search category..."
                options={CATEGORY_OPTIONS}
                value={cat}
                onChange={setCat}
              />
              <GlassSelect
                label="Category"
                name="category"
                placeholder="Choose a category"
                options={CATEGORY_OPTIONS}
                onChange={setCategory}
                isRequired
              />
              <GlassSelect
                label="Template"
                name="template"
                placeholder="Choose a template"
                options={[...PROJECT_TEMPLATES]}
                defaultValue="blank"
                onChange={setTemplate}
                isRequired
              />
              <GlassDatePicker
                label="Start date"
                name="startDate"
                description="First working day for this project."
              />
              <GlassTimePicker
                label="Daily standup"
                name="standupTime"
                description="When the team syncs each day."
              />
            </div>
  
            <GlassRadioGroup
              label="Visibility"
              name="visibility"
              options={[...VISIBILITY_OPTIONS]}
              defaultValue="private"
              aria-label="Visibility"
            />
          </GlassCard>
  
          <GlassCard delay={3} className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)]">Features and members</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Add capabilities now - you can change them later.
              </p>
            </div>
  
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-sm font-medium text-[var(--text-secondary)]">Features</legend>
              {FEATURE_OPTIONS.map((feature) => (
                <GlassCheckbox
                  key={feature.value}
                  name="features"
                  value={feature.value}
                  label={feature.label}
                  description="Enable this capability for every member of the project."
                />
              ))}
            </fieldset>
  
            <GlassSearchSelect
              label="Project lead"
              name="members"
              placeholder="Search workspace members"
              options={MEMBER_OPTIONS.map((member) => ({ value: member.value, label: member.label }))}
            />
          </GlassCard>
  
          {state.status === "error" ? (
            <p role="alert" className="flex items-center gap-2 text-sm font-medium text-[var(--danger)]">
              <AlertTriangle className="size-4" aria-hidden />
              {state.message}
            </p>
          ) : null}
  
          {state.status === "success" ? (
            <p role="status" className="flex items-center gap-2 text-sm font-medium text-[var(--success)]">
              <CheckCircle2 className="size-4" aria-hidden />
              {state.message}
            </p>
          ) : null}
  
          <div className="glass glass-border sticky bottom-24 z-20 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-4 lg:static">
            <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <Sparkles className="size-4" aria-hidden />
              Drafts are saved to the workspace instantly.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/projects" className={glassButtonStyles({ variant: "ghost" })}>
                Cancel
              </Link>
              <GlassButton type="submit" isLoading={isPending}>
                Create project
              </GlassButton>
            </div>
          </div>
        </form>
      </div>
    );
}
