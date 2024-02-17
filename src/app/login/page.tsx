import LoginForm from "@/components/LoginForm";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session) redirect("/admin");
  return (
    <div className="flex w-full justify-center py-8">
      <LoginForm />
    </div>
  );
}
