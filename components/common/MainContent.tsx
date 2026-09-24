import type { ReactNode } from "react";
import { PageContent } from "@/components/common/PageContent";
import { Sidebar } from "@/components/common/Sidebar";

export function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-6 px-6 pb-6 pt-24">
      <Sidebar />
      <PageContent>{children}</PageContent>
    </div>
  );
}
