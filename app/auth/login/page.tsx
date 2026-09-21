import { LoginForm } from "@/components/views/auth/LoginForm";
import { AuthLayout } from "@/layouts/AuthLayout";
export default async function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
