import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/layouts/AuthLayout";
export default async function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
