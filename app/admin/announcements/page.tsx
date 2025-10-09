import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CCAnnouncementManager from "@/components/client/CCAnnouncementManager";

export default async function AnnouncementsPage() {
  const session = await auth();
  const isAdmin = !!(session?.user as any)?.isAdmin;
  
  if (!isAdmin) {
    redirect("/");
  }

  return <CCAnnouncementManager />;
}