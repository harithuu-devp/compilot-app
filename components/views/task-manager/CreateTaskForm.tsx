"use client";
import { useState, SubmitEvent } from "react";
import { createTask } from "@/services/task-manager/actions";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function CreateTaskForm() {
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
      await createTask(formData);
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
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form className="glass-card p-6 sm:p-8" onSubmit={onSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="field-label" htmlFor="name">
              Task Name
            </label>
            <input
              className="field"
              id="title"
              name="title"
              required
              maxLength={140}
            />
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
            {isLoading ? <LoadingSpinner label="Creating task" /> : "Save task"}
          </button>
        </div>
      </form>
    </div>
  );
}
