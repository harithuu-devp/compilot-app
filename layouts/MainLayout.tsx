import type { ReactNode } from "react";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { MainContent } from "@/components/common/MainContent";
import { MobileBottomNavbar } from "@/components/common/MobileBottomNavbar";
import { Sidebar } from "@/components/common/Sidebar";
import type { LoggedInUser } from "@/types";

export function MainLayout({
  children,
  user,
}: {
  children: ReactNode;
  user: LoggedInUser;
}) {
  return (
    <div className="min-h-dvh">
      <Header user={user} />

      <div className="mx-auto flex max-w-[1600px] items-stretch gap-6 px-3 pb-5 sm:px-6 lg:min-h-[calc(100dvh-6rem)]">
        <Sidebar />

        <MainContent>
          {children}
          <Footer />
        </MainContent>
      </div>

      <MobileBottomNavbar />
    </div>
  );
}
