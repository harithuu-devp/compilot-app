import Link from "next/link";
import { Plus } from "lucide-react";

type Props = {
  href: string;
  title: string;
  description: string;
};

export function CreateItemCard({
  href,
  title,
  description,
}: Props) {
  return (
    <Link
      href={href}
      className="
        group relative flex min-h-[220px] flex-col items-center justify-center rounded-[28px]
        border-2 border-dashed border-blue-400/50
        bg-white/45
        p-6 text-center transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-500
        hover:bg-white/70
        hover:shadow-2xl hover:shadow-blue-500/20
        dark:bg-slate-950/20
        dark:hover:bg-slate-900/40
      "
    >
      <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 transition group-hover:scale-110">
        <Plus size={34} strokeWidth={2.5} />
      </div>

      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-3 max-w-[220px] text-sm text-[var(--muted)]">
        {description}
      </p>
    </Link>
  );
}