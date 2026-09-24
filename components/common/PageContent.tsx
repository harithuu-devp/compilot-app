import type { ReactNode } from "react";
import { Footer } from "@/components/common/Footer";

export function PageContent({ children }: { children: ReactNode }) {
  return (
    <main className="glass-panel flex min-h-[calc(100dvh-7.5rem)] min-w-0 flex-1 flex-col gap-6 p-5 sm:p-6 lg:p-8 [&>footer]:mt-auto">
      {children}
      <Footer />
    </main>
  );
}
