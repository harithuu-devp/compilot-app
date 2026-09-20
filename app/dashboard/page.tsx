import { Home } from "@/components/dashboard/Home";
import { requireUser } from "../../lib/auth";
import { MainLayout } from "@/layouts/MainLayout";
export default async function DashboardPage() {
  const user = await requireUser();
  return (
    <MainLayout user={user}>
      <Home name={user.name} />
    </MainLayout>
  );
}
