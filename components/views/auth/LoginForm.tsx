"use client"

import { useActionState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassCheckbox } from "@/components/ui/GlassCheckbox";
import { GlassButton } from "@/components/ui/GlassButton";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import { LoginFormState } from "@/types";
import { signIn } from "@/services/auth/actions";

const initialState: LoginFormState = {};
const app_name = process.env.NEXT_PUBLIC_APP_NAME;

export default function LoginForm(){
    const[state, formAction, isPending] = useActionState(signIn, initialState);
    return(
        <GlassCard delay={1} padded className="animate-fade-up">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image src="/logo.svg" alt="" width={48} height={48} priority className="glow-blue size-12 rounded-2xl" />
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Welcome back</h1>
          <p className="text-sm text-[var(--text-secondary)]">Sign in to continue to your {app_name} workspace.</p>
        </div>

        <form action={formAction} className="mt-8 flex flex-col gap-5">
          <GlassInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            error={state.field === "email" ? state.message : undefined}
          />

          <GlassInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            minLength={8}
            required
            error={state.field === "password" ? state.message : undefined}
          />

          <div className="flex items-center justify-between gap-4">
            <GlassCheckbox label="Remember me" name="remember" defaultChecked />
            <Link href="/auth/login" className="text-xs font-medium text-[var(--primary)] hover:underline">
              Forgot password?
            </Link>
          </div>

          {state.status === "error" && !state.field ? (
            <p role="alert" className="flex items-center gap-2 text-sm font-medium text-[var(--danger)]">
              <AlertTriangle className="size-4" aria-hidden />
              {state.message}
            </p>
          ) : null}

          <GlassButton type="submit" size="lg" fullWidth isLoading={isPending}>
            Sign in
          </GlassButton>

          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <span className="h-px flex-1 bg-[var(--glass-border)]" />
            or
            <span className="h-px flex-1 bg-[var(--glass-border)]" />
          </div>

          <GlassButton type="button" variant="secondary" size="lg" fullWidth>
            <span aria-hidden className="text-sm font-semibold text-[var(--primary)]">
              G
            </span>
            Continue with Google
          </GlassButton>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
          New to {app_name}?{" "}
          <Link href="/projects/create" className="font-medium text-[var(--primary)] hover:underline">
            Create a project
          </Link>
        </p>
      </GlassCard>
    )
}