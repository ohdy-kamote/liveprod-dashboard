import { signIn } from "@/auth";
import { checkAuth } from "@/utils/helpers";
import { redirect } from "next/navigation";

export default async function Login() {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) redirect("/");

  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", { 
          username: formData.get("username"),
          password: formData.get("password"),
          redirectTo: "/"
        });
      }}
    >
      <div className="flex justify-center w-1/3">
        <div className="flex flex-col gap-5">
          <label>
            Username
            <input className="border" name="username" type="text" />
          </label>
          <label>
            Password
            <input className="border" name="password" type="password" />
          </label>
          <button className="p-2 bg-sky-600 rounded-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}
