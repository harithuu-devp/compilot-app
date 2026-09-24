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
    <aside className={`sticky top-24 h-[calc(100dvh-96px-24px)] w-full overflow-hidden p-3 transition-[max-width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${collapsed ? "sidebar-collapsed max-w-24" : "max-w-72"} glass-panel grid grid-rows-[auto_auto_1fr]`}>
      <div className="mb-5 grid grid-cols-[1fr_auto] gap-2">
        <span className={`overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[.16em] text-[var(--muted)] transition-all duration-300 ${collapsed ? "invisible w-0" : "visible w-28"}`}>Workspace</span>
        <button className="icon-button h-10 w-10 shrink-0" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
          <ChevronLeft className={`transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`} size={18} />
        </button>
      </div>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`nav-link ${active ? "nav-link-active" : ""}`} title={link.label}>
              <Icon className="shrink-0" size={20} />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${collapsed ? "invisible w-0" : "visible w-auto"}`}>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="self-end border-t border-[var(--line)] p-2">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--muted)]">More modules</p>
          <p className="p-2 text-xs leading-5 text-[var(--muted)]">Agencies, budgets, vendors and more will appear here.</p>
        </div>
      )}
    </aside>
  );
}
