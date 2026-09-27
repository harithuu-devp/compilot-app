import { AuroraBackground } from "@/components/common/AuroraBackground";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <AuroraBackground />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}