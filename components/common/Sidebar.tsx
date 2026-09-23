"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "⌂" },
  { href: "/projects", label: "Projects", icon: "▣" },
  { href: "/task", label: "Task mgr", icon: "▣" },
];
export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:block ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      <div className="mb-6 flex items-center justify-between px-2">
        <span
          className={`text-xs font-semibold uppercase tracking-[.16em] text-[var(--muted)] ${collapsed ? "sr-only" : ""}`}
        >
          Workspace
        </span>
        <button
          className="icon-button h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname.startsWith(link.href) ? "nav-link-active" : ""}`}
            title={link.label}
          >
            <span>{link.icon}</span>
            <span className={collapsed ? "sr-only" : ""}>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div
        className={`mt-8 border-t border-[var(--line)] pt-5 ${collapsed ? "hidden" : "block"}`}
      >
        <p className="px-3 text-xs font-medium text-[var(--muted)]">
          More modules
        </p>
        <p className="px-3 pt-2 text-xs text-[var(--muted)]">
          Agencies, budgets, vendors and more will appear here.
        </p>
      </div>
    </aside>
  );
}
