"use client";
import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { createProject } from "@/services/project/actions";

const statuses = [
  "lead",
  "proposal",
  "quoted",
  "awarded",
  "planning",
  "preparation",
  "event",
  "post_event",
  "completed",
  "archived",
];

export default function CreateProjectForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const form = event.currentTarget;

    try {
      const formData = new FormData(form);
        await createProject(formData);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="glass-card p-6 sm:p-8" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="field-label" htmlFor="name">
            Project Name
          </label>
          <input
            className="field"
            id="name"
            name="name"
            required
            maxLength={140}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="agency">
            Agency
          </label>
          <input className="field" id="agency" name="agency" required />
        </div>
        <div>
          <label className="field-label" htmlFor="venue">
            Venue
          </label>
          <input className="field" id="venue" name="venue" required />
        </div>
        <div>
          <label className="field-label" htmlFor="startDate">
            Start Date
          </label>
          <input
            className="field"
            id="startDate"
            name="startDate"
            type="date"
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="endDate">
            End Date
          </label>
          <input
            className="field"
            id="endDate"
            name="endDate"
            type="date"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="field-label" htmlFor="status">
            Status
          </label>
          <select
            className="field"
            id="status"
            name="status"
            defaultValue="lead"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="field-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="field min-h-28 resize-y"
            id="description"
            name="description"
            required
            maxLength={1000}
          />
        </div>
      </div>
      {error && (
        <p
          className="mt-5 rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-700 dark:text-rose-300"
          role="alert"
        >
          {error}
        </p>
      )}
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          className="button-secondary"
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className="button-primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner label="Creating project" />
          ) : (
            "Create project"
          )}
        </button>
      </div>
    </form>
  );
}
