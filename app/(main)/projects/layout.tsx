import type { Metadata } from "next";
import "@/lib/suppress-heroui-warning";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse, filter and sort every project in the workspace.",
};

export default function ProjectsLayout({ children }: LayoutProps<"/projects">) {
  return children;
}
