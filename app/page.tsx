import { ArrowRight, Layers, Moon, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { GlassCard, staggerDelay } from "@/components/ui/GlassCard";
import { glassButtonStyles } from "@/components/ui/GlassButton";

const app_name = process.env.NEXT_PUBLIC_APP_NAME;

const HIGHLIGHTS = [
  {
    title: "Liquid glass surfaces",
    description: "Frosted panels, ambient shadows and aurora light that stay crisp in light and dark mode.",
    Icon: Layers,
  },
  {
    title: "Cookie driven theming",
    description: "Themes render on the server from a cookie, so there is no flash and no layout shift.",
    Icon: Moon,
  },
  {
    title: "Motion that respects users",
    description: "Framer Motion transitions for every surface, automatically disabled for reduced motion.",
    Icon: Zap,
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AuroraBackground />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6">
        <span className="flex items-center gap-3">
          <Image src="/logo.svg" alt="" width={40} height={40} priority className="glow-blue size-10 rounded-2xl" />
          <span className="text-base font-semibold tracking-tight text-[var(--text)]">{app_name}</span>
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className={glassButtonStyles({ variant: "secondary", size: "sm" })}>
            Sign in
          </Link>
        </div>
      </header>

      <section className="relative mx-auto w-full max-w-6xl px-5 pt-10 pb-16 md:pt-20">
        <GlassBadge variant="purple" size="md" className="animate-fade-up">
          Design system v3.1
        </GlassBadge>

        <h1 className="animate-fade-up mt-6 max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
          A <span className="text-gradient">frosted glass</span> control center for modern SaaS teams.
        </h1>

        <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
          {app_name} pairs Apple style liquid glass with Linear grade spacing, Raycast inspired surfaces and Vercel
          gradients. Server rendered, theme safe and ready to extend.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/dashboard" className={glassButtonStyles({ size: "lg" })}>
            Open dashboard
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/projects" className={glassButtonStyles({ variant: "secondary", size: "lg" })}>
            Browse projects
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map(({ title, description, Icon }, index) => (
            <GlassCard key={title} interactive delay={staggerDelay(index)}>
              <span className="bg-gradient-secondary flex size-11 items-center justify-center rounded-2xl text-white glow-violet">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-[var(--text)]">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="relative mx-auto w-full max-w-6xl px-5 pb-12 text-xs text-[var(--muted)]">
        Built with Next.js 16, Tailwind CSS v4, HeroUI and Framer Motion.
      </footer>
    </main>
  );
}
