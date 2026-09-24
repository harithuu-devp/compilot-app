"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell } from "lucide-react";
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
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-[var(--line)] bg-[color:var(--glass-fill)] shadow-[0_4px_20px_var(--glass-shadow)] backdrop-blur-3xl">
      <div className="mx-auto flex h-full w-full items-center justify-between px-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">C</div>
          <div>
            <p className="font-bold tracking-tight">ComPilot</p>
            <p className="hidden text-xs text-[var(--muted)] sm:block">Event operations workspace</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <span className="icon-button hidden sm:grid" aria-hidden="true"><Bell size={18} /></span>
          <div className="flex items-center gap-3 rounded-full border border-[var(--glass-border)] bg-[color:var(--glass-fill)] py-1.5 pl-1.5 pr-2 shadow-sm backdrop-blur-2xl sm:pr-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-semibold text-white">{user.name.charAt(0).toUpperCase()}</div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-[var(--muted)]">{user.role}</p>
            </div>
          </div>
          <button className="button-secondary hidden sm:inline-flex" onClick={signOut} disabled={busy}>{busy ? "Signing out…" : "Logout"}</button>
        </div>
      </div>
    </header>
  );
}
