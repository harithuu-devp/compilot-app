import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass-card flex min-h-64 flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-xl">
        ⌁
      </div>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}