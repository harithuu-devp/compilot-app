/**
 * Project form state shared with the client.
 * Lives outside the "use server" module because server action files may only
 * export async functions.
 */
export type ProjectFormState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export const INITIAL_PROJECT_STATE: ProjectFormState = { status: "idle" };
