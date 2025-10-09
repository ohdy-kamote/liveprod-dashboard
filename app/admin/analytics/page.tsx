import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CCAdminAnalytics from "@/components/client/CCAdminAnalytics";

export default async function AdminAnalyticsPage() {
  const session = await auth();
  const isAdmin = !!(session?.user as any)?.isAdmin;
  
  if (!isAdmin) {
    redirect("/");
  }

  return <CCAdminAnalytics />;
}