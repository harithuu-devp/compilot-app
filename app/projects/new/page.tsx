import CreateProject from "@/components/views/project/CreateProjectForm";
import { MainLayout } from "@/layouts/MainLayout";
import { requireUser } from "@/lib/auth";

export default async function NewProject() {
    const user = await requireUser();
    return (
        <MainLayout user={user}>
            <CreateProject></CreateProject>
        </MainLayout>
    )
}
