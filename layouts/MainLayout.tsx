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
      <div className="flex items-start gap-6 px-5 pb-24 pt-24 sm:px-6 lg:pb-6">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <main className="glass-panel min-h-[calc(100dvh-7.5rem)] p-5 sm:p-6 lg:p-8">{children}</main>
          <Footer />
        </div>
      </div>
      <MobileBottomNavbar />
    </div>
  );
}
