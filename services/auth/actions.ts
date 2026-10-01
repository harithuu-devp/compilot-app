"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import type { LoginFormState } from "@/types/index";
import User from "@/models/User";
import { createSession } from "@/lib/session";
import { validateLogin } from "@/validations/validateLogin";

export async function signIn(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const result = validateLogin.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  });

  if (!result.success) {
    const issue = result.error.issues[0];
    return {
      status: "error",
      message: issue.message,
      field: issue.path[0] as "email" | "password",
    };
  }

  const user = await User.findOne({
    email: result.data.email
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }   

  const passwordValid = await bcrypt.compare(
    result.data.password,
    user.password
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  await createSession(user._id.toString());

  redirect("/dashboard");
}