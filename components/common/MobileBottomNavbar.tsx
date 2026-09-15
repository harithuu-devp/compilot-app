"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBottomNavbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 flex justify-around rounded-2xl border border-white/40 bg-white/80 p-2 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 lg:hidden">
      <Link
        className={`mobile-link ${pathname.startsWith("/dashboard") ? "mobile-link-active" : ""}`}
        href="/dashboard"
      >
        ⌂<span>Home</span>
      </Link>
      <Link
        className={`mobile-link ${pathname.startsWith("/projects") ? "mobile-link-active" : ""}`}
        href="/projects"
      >
        ▣<span>Projects</span>
      </Link>
      <button className="mobile-link" type="button">
        •••<span>More</span>
      </button>
    </nav>
  );
}
