"use client";
import { useState, SubmitEvent } from "react";
import { createTask } from "@/services/task-manager/actions";

export function CreateTaskForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      await createTask(formData);
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          required
          style={{
            display: "block",
            border: "1px solid black",
            padding: "8px",
            color: "black",
            backgroundColor: "white",
          }}
        />

        <textarea
          name="description"
          placeholder="Task description"
          required
          style={{
            display: "block",
            border: "1px solid black",
            padding: "8px",
            color: "black",
            backgroundColor: "white",
          }}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
