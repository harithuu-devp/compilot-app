"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  create: "Create project",
  auth: "Account",
  login: "Sign in",
};

export type BreadcrumbProps = {
  className?: string;
};

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}`,
    label: LABELS[segment] ?? segment.replace(/-/g, " "),
  }));

  return (
    <nav aria-label="Breadcrumb" className={cn("hidden md:block", className)}>
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-[var(--muted)] transition-glass hover:text-[var(--text)]">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              <ChevronRight aria-hidden className="size-3.5 text-[var(--muted)]" />
              {isLast ? (
                <span aria-current="page" className="font-medium text-[var(--text)]">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="text-[var(--muted)] transition-glass hover:text-[var(--text)]">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
