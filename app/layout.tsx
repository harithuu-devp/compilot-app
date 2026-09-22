import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compilot",
  description: "Compilot",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("compilot-theme")?.value ?? "light";

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}