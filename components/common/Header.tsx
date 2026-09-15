"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { LoggedInUser } from "@/types";

export function Header({ user }: { user: LoggedInUser }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }
  return (
    <header className="sticky top-3 z-30 mx-3 mb-5 flex h-16 items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:mx-6 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] font-bold text-white">
          C
        </div>
        <div>
          <p className="font-semibold tracking-tight">ComPilot</p>
          <p className="hidden text-xs text-[var(--muted)] sm:block">
            Event operations workspace
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-[var(--muted)]">{user.role}</p>
        </div>
        <button
          className="button-secondary hidden sm:inline-flex"
          onClick={signOut}
          disabled={busy}
        >
          {busy ? "Signing out…" : "Logout"}
        </button>
      </div>
    </header>
  );
}
