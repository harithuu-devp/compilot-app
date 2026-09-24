import type { ReactNode } from "react";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { MobileBottomNavbar } from "@/components/common/MobileBottomNavbar";
import { Sidebar } from "@/components/common/Sidebar";
import type { LoggedInUser } from "@/types";

export function MainLayout({ children, user }: { children: ReactNode; user: LoggedInUser }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[var(--bg-base)]">
      <Header user={user} />
      <div className="flex items-start gap-6 px-6 pb-6 pt-24">
        <div className="hidden w-72 shrink-0 self-start lg:block">
          <Sidebar />
        </div>
        <div className="min-w-0 flex-1">
          <main className="glass-panel min-h-[calc(100dvh-7.5rem)] p-5 sm:p-6 lg:p-8">{children}</main>
          <Footer />
        </div>
      </div>
      <MobileBottomNavbar />
    </div>
  );
}
