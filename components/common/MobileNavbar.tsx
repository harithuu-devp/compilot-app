"use client";

import { Bell, CircleUser, LayoutDashboard, PlusCircle, Shapes, CardSim, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, type NavItem } from "@/lib/constants";
import { cn } from "cn";

const ICONS: Record<NavItem["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  projects: Shapes,
  create: PlusCircle,
  notifications: Bell,
  profile: CircleUser,
  form: CardSim
};

export function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="glass-chrome fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full p-2 lg:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.label}
            title={item.label}
            className={cn(
              "flex size-11 items-center justify-center rounded-full transition-glass focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none",
              isActive
                ? "bg-gradient-primary text-white glow-blue"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
            )}
          >
            <Icon className="size-5" aria-hidden />
          </Link>
        );
      })}
    </nav>
  );
}
