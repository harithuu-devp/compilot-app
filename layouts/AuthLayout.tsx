import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-shell">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-700/20" />
      <div className="absolute bottom-0 right-8 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-800/20" />
      <section className="relative z-10 w-full max-w-md">{children}</section>
    </main>
  );
}
