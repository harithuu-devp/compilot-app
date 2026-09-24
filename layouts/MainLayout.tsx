import type { ReactNode } from "react";
import { Header } from "@/components/common/Header";
import { MainContent } from "@/components/common/MainContent";
import { MobileBottomNavbar } from "@/components/common/MobileBottomNavbar";
import type { LoggedInUser } from "@/types";

export function MainLayout({ children, user }: { children: ReactNode; user: LoggedInUser }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[var(--bg-base)]">
      <Header user={user} />
      <MainContent>{children}</MainContent>
      <MobileBottomNavbar />
    </div>
  );
}
