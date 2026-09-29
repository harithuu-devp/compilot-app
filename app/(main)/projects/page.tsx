import ProjectList from "@/components/views/projects/ProjectList";
import { requireUser } from "@/lib/auth";

export default async function ProjectsPage() {
  const user = await requireUser();
  return (
    <ProjectList></ProjectList>
  );
}
