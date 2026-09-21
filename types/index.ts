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