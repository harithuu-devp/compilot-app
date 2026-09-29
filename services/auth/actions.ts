"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import type { LoginFormState } from "@/types/index";
import User from "@/models/User";
import { createSession } from "@/lib/session";

export async function signIn(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
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

  const user = await User.findOne({
    email: email,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  await createSession(user._id.toString());

  redirect("/dashboard");
}