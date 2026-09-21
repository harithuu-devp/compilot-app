"use client";

import { useActionState } from "react";
import { login } from "@/app/auth/login/actions";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { LoginState } from "@/types";

const initialState: LoginState = {};

export function LoginForm() {
    const [state, formAction, pending] = useActionState(
        login,
        initialState
    );

    return (
        <form
            className="glass-card p-7 sm:p-9"
            action={formAction}
        >
            <div className="mb-8">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-xl font-bold text-white">
                    C
                </div>

                <p className="eyebrow">
                    Event operations platform
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Welcome to ComPilot
                </h1>

                <p className="mt-2 text-sm text-[var(--muted)]">
                    Sign in to manage projects and event delivery.
                </p>
            </div>

            <label
                className="field-label"
                htmlFor="email"
            >
                Email
            </label>

            <input
                className="field"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
            />

            <label
                className="field-label mt-5"
                htmlFor="password"
            >
                Password
            </label>

            <input
                className="field"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                required
                minLength={8}
            />

            {state.error && (
                <p
                    className="mt-4 rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-700 dark:text-rose-300"
                    role="alert"
                >
                    {state.error}
                </p>
            )}

            <button
                className="button-primary mt-6 w-full"
                type="submit"
                disabled={pending}
            >
                {pending ? (
                    <LoadingSpinner label="Signing in" />
                ) : (
                    "Sign in"
                )}
            </button>
        </form>
    );
}