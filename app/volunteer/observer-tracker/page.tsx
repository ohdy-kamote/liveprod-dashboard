import { auth } from "@/auth";
import CCObserverTracker from "@/components/client/CCObserverTracker";

export default async function ObserverTrackerPage() {
  const session = await auth();
  const isAuthenticated = !!(session?.user as any)?.username;

  return (
    <div className="w-full">
      <CCObserverTracker isAuthenticated={isAuthenticated} />
    </div>
  );
}