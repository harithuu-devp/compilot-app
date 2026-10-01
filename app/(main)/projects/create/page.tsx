import ProjectCreationForm from "@/components/views/projects/ProjectCreationForm";
import { requireUser } from "@/lib/auth";
export default function CreateProjectPage() {
  const user = requireUser();
  return(
    <ProjectCreationForm></ProjectCreationForm>
  );
}
