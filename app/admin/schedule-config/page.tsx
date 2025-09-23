import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import CCScheduleConfigManager from "@/components/client/CCScheduleConfigManager";

export default async function ScheduleConfigPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
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
