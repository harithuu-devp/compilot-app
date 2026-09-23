import { ProjectList } from "@/components/views/project/ProjectList";
import { MainLayout } from "@/layouts/MainLayout";
import { requireUser } from "@/lib/auth";

export default async function ProjectPage(){
    const user = await requireUser();
    const projects = {};
    return(
        <MainLayout user={user}>
            <ProjectList projects={projects}></ProjectList>
        </MainLayout>
    );
}