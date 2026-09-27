"use server";

import { FEATURE_OPTIONS, PROJECT_CATEGORIES, VISIBILITY_OPTIONS } from "@/lib/constants";
import type { ProjectFormState } from "./form-state";

const CATEGORY_VALUES = PROJECT_CATEGORIES as readonly string[];
const VISIBILITY_VALUES = VISIBILITY_OPTIONS.map((option) => option.value) as readonly string[];
const FEATURE_VALUES = FEATURE_OPTIONS.map((option) => option.value) as readonly string[];

/** Validate and submit a new project. */
export async function createProject(_state: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  console.log(formData);
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const template = String(formData.get("template") ?? "");
  const visibility = String(formData.get("visibility") ?? "");
  const features = formData.getAll("features").map(String);
  const members = formData.getAll("members").map(String).filter(Boolean);
  const startDate = String(formData.get("startDate") ?? "");
  const standupTime = String(formData.get("standupTime") ?? "");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (name.length < 3) {
    return { status: "error", message: "Project name must be at least 3 characters." };
  }

  if (description.length > 240) {
    return { status: "error", message: "Description must be 240 characters or fewer." };
  }

  if (!CATEGORY_VALUES.includes(category)) {
    return { status: "error", message: "Choose a category." };
  }

  if (!template) {
    return { status: "error", message: "Choose a template." };
  }

  if (!VISIBILITY_VALUES.includes(visibility)) {
    return { status: "error", message: "Choose a visibility level." };
  }

  if (features.some((feature) => !FEATURE_VALUES.includes(feature))) {
    return { status: "error", message: "One or more features are not supported." };
  }

  if (tags.length > 8) {
    return { status: "error", message: "Use at most 8 tags." };
  }

  // Persistence is out of scope for the design system - acknowledge the submission.
  const schedule = [startDate && `starts ${startDate}`, standupTime && `standup ${standupTime}`]
    .filter(Boolean)
    .join(", ");

  return {
    status: "success",
    message: `Project "${name}" queued with ${members.length} member(s), ${features.length} feature(s)${
      schedule ? ` and schedule (${schedule}).` : "."
    }`,
  };
}
