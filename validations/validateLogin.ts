import { z } from "zod";

export const validateLogin = z.object({
    email: z
        .string()
        .min(1, "Email is required ya.")
        .pipe(z.email("Enter a valid email address.")),

    password: z
        .string()
        .min(1, "Password is required.")
        .min(8, "Password must be at least 8 characters."),
});

export type LoginInput = z.infer<typeof validateLogin>;