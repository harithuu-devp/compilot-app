"use client";

import { motion } from "framer-motion";
import { Bell, CircleUser, LayoutDashboard, PlusCircle, Shapes, CardSim, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, type NavItem } from "@/lib/constants";
import { cn } from "cn";

const app_name = process.env.NEXT_PUBLIC_APP_NAME;


const ICONS: Record<NavItem["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  projects: Shapes,
  create: PlusCircle,
  notifications: Bell,
  profile: CircleUser,
  form: CardSim
};

export const SIDEBAR_EXPANDED_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 88;

export type SidebarProps = {
  collapsed: boolean;
};

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
      initial={false}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-sidebar fixed top-0 bottom-0 left-0 z-20 hidden flex-col overflow-hidden lg:flex"
      aria-label="Main navigation"
    >
      <div className={cn("mt-[72px] flex h-[72px] items-center gap-3 px-5", collapsed && "justify-center px-0")}>
        <Image src="/logo.svg" alt="" width={40} height={40} priority className="glow-blue size-10 shrink-0 rounded-2xl" />
        <motion.span
          animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="min-w-0"
        >
          <span className="block truncate text-base font-semibold tracking-tight text-[var(--text)]">{app_name}</span>
          <span className="block truncate text-xs text-[var(--muted)]">Control center</span>
        </motion.span>
      </div>

      <nav className="glass-scrollbar mt-3 flex flex-1 flex-col gap-1.5 overflow-y-auto px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex h-12 items-center gap-3 rounded-xl px-3 transition-glass",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-gradient-primary text-white glow-blue"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
              )}
            >
              {/* {isActive ? <span aria-hidden className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-[var(--primary)]" /> : null} */}
              <Icon className="size-5 shrink-0" aria-hidden />
              <motion.span
                animate={{ opacity: collapsed ? 0 : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="truncate text-sm font-medium"
              >
                {item.label}
              </motion.span>

              {collapsed ? (
                <span
                  role="tooltip"
                  className="glass pointer-events-none absolute left-full z-50 ml-3 rounded-xl px-3 py-1.5 text-xs font-medium text-[var(--text)] opacity-0 transition-glass group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {item.label}
                </span>
              ) : null}

              {collapsed ? <span className="sr-only">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className={cn("px-3 pb-4", collapsed && "px-2")}>
        <div className={cn("glass glass-border rounded-2xl p-3", collapsed && "grid place-items-center p-2")}>
          {collapsed ? (
            <span className="text-xs font-semibold text-[var(--text-secondary)]">v3.1</span>
          ) : (
            <>
              <p className="text-xs font-semibold text-[var(--text)]">GlassDash v3.1</p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">Design system ready</p>
            </>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
