"use client";

import { useState } from "react";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { Header } from "@/components/common/Header";
import { MainContent } from "@/components/common/MainContent";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { Sidebar } from "@/components/common/Sidebar";

export type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <Sidebar collapsed={collapsed} />
      <Header collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} />
      <MainContent collapsed={collapsed}>{children}</MainContent>
      <MobileNavbar />
    </div>
  );
}
