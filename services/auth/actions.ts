"use server";

import { redirect } from "next/navigation";
import type { LoginFormState } from "@/types/index";

export async function signIn(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email) {
    return {
      status: "error",
      message: "Email is required.",
      field: "email",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "Enter a valid email address.",
      field: "email",
    };
  }

  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters.",
      field: "password",
    };
  }

  redirect("/dashboard");
}