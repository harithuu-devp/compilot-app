"use server";

import { redirect } from "next/navigation";
import { loginUser } from "@/services/authService";
import type { LoginState } from "@/types";

export async function login(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const email = formData.get("email");
    const password = formData.get("password");

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return {
            error: "Email and password are required.",
        };
    }

    try {
        await loginUser(email, password);
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.message,
            };
        }

        return {
            error: "Unable to sign in. Please try again.",
        };
    }

    redirect("/dashboard");
}