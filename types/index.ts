export type UserRole = "admin" | "staff";

export type LoggedInUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

export type LoginState = {
    error?: string;
};

export type LoginFormState = {
  status?: "idle" | "error";
  message?: string;
  field?: "email" | "password";
};