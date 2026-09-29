import type { Metadata } from "next";
import { cookies } from "next/headers";
import {Inter} from "next/font/google"
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compilot",
  description: "Compilot",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("compilot-theme")?.value ?? "light";

  return (
    <html lang="en" data-theme={theme} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}