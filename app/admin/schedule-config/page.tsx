import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CCScheduleConfigManager from "@/components/client/CCScheduleConfigManager";

export default async function ScheduleConfigPage() {
  const session = await auth();
  
  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <CCScheduleConfigManager />
      </div>
    </div>
  );
}
