import { Home } from "@/components/views/dashboard/Home";
import { requireUser } from "@/lib/auth";
import { MainLayout } from "@/layouts/MainLayout";
import { CreateTaskForm } from "@/components/views/task-manager/CreateTaskForm";
export default async function DashboardPage() {
  const user = await requireUser();
  return (
    <MainLayout user={user}>
      <CreateTaskForm></CreateTaskForm>
    </MainLayout>
  );
}
