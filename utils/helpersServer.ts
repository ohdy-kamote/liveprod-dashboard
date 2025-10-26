import { auth } from "@/auth";

export async function checkAuth() {
  const session = await auth();
  const authenticated = !!session?.user;
  console.log('checkAuth - session:', session?.user?.username, 'authenticated:', authenticated);
  return authenticated;
}

export async function checkAdminAuth() {
  const session = await auth();
  const isAdmin = !!(session?.user as any)?.isAdmin;
  return isAdmin;
}
