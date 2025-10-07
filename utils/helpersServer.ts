import { auth } from "@/auth";

export async function checkAuth() {
  const session = await auth();
  const authenticated = !!session?.user;
  return authenticated;
}

export async function checkAdminAuth() {
  const session = await auth();
  const isAdmin = !!(session?.user as any)?.isAdmin;
  return isAdmin;
}
