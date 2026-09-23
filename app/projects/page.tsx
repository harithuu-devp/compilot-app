import { ProjectList } from "@/components/views/project/ProjectList";
import { MainLayout } from "@/layouts/MainLayout";
import { requireUser } from "@/lib/auth";
import { getProjects } from "@/services/project/actions";

export default async function ProjectPage(){
    const user = await requireUser();
    const projects = await getProjects();
    return(
        <MainLayout user={user}>
            <ProjectList projects={projects}></ProjectList>
        </MainLayout>
    );
}