import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { THEME_COOKIE, isTheme, type Theme } from "@/lib/constants";
import "@/app/globals.css";
import HeroUiWarningBypass from "@/components/HeroUiWarningBypass";

const app_name = process.env.NEXT_PUBLIC_APP_NAME;
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${app_name} — Company Event Business Administration`,
    template: `%s · ${app_name}`,
  },
  description: "GlassDash is a frosted glass SaaS dashboard built with Next.js, Tailwind CSS v4 and HeroUI.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const stored = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme: Theme = isTheme(stored) ? stored : "system";
  const htmlClass = [inter.variable, "h-full antialiased", initialTheme === "system" ? "" : initialTheme]
    .filter(Boolean)
    .join(" ");

  return (
    <html lang="en" className={htmlClass} suppressHydrationWarning>
      <body className="min-h-full">
        <HeroUiWarningBypass></HeroUiWarningBypass>
        <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
