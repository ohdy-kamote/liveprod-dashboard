import { auth } from "@/auth";
import CCAnalytics from "@/components/client/CCAnalytics";

export default async function AnalyticsPage() {
  const session = await auth();
  const isAuthenticated = !!(session?.user as any)?.username;

  return (
    <div className="w-full">
      <CCAnalytics isAuthenticated={isAuthenticated} />
    </div>
  );
}