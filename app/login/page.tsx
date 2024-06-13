import { signIn } from "@/auth";
import CpLogin from "@/components/Login";
import { checkAuth } from "@/utils/helpers";
import { redirect } from "next/navigation";

export default async function Login() {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) redirect("/");

  const handleFormAction = async (formData: FormData) => {
    "use server";

    try {
      await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirectTo: "/"
      });
    } catch (error: any) {
      if (error.message === "NEXT_REDIRECT") redirect("/");
    }
  }

  return (
    <form action={handleFormAction}>
      <CpLogin />
    </form>
  );
}
