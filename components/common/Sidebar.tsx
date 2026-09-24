"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ClipboardList, FolderKanban, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/task", label: "Task mgr", icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sticky top-24 hidden h-[calc(100dvh-7.5rem)] shrink-0 flex-col overflow-hidden px-3 py-5 transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:flex ${collapsed ? "w-24" : "w-72"} glass-panel`}>
      <div className="mb-5 flex items-center justify-between px-2">
        <span className={`overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[.16em] text-[var(--muted)] transition-all duration-300 ${collapsed ? "w-0 opacity-0" : "w-28 opacity-100"}`}>Workspace</span>
        <button className="icon-button h-10 w-10 shrink-0" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
          <ChevronLeft className={`transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} size={18} />
        </button>
      </div>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`nav-link ${active ? "nav-link-active" : ""} ${collapsed ? "justify-center" : ""}`} title={link.label}>
              <Icon className="shrink-0" size={20} />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="mt-auto border-t border-[var(--line)] px-2 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--muted)]">More modules</p>
          <p className="pt-2 text-xs leading-5 text-[var(--muted)]">Agencies, budgets, vendors and more will appear here.</p>
        </div>
      )}
    </aside>
  );
}
