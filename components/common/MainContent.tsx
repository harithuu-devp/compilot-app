import type { ReactNode } from "react";
export function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className="min-w-0 flex-1 px-4 pb-2 sm:px-6">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}
