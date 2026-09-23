
import { requireUser } from "@/lib/auth";
import { MainLayout } from "@/layouts/MainLayout";
import { CreateTaskForm } from "@/components/views/task-manager/CreateTaskForm";
import { taskList } from "@/services/task-manager/actions";
import { TaskList } from "@/components/views/task-manager/TaskList";
export default async function TaskPage() {
  const user = await requireUser();
  const tasks = await taskList();
  return (
    <MainLayout user={user}>
      <CreateTaskForm ></CreateTaskForm>
      <TaskList tasks={tasks}></TaskList>
    </MainLayout>
  );
}
