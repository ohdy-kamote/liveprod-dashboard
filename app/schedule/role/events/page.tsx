import CCEventsManager from "@/components/client/CCEventsManager";
import { auth } from "@/auth";

export default async function EventsPage() {
  const session = await auth();
  const isAuthenticated = !!(session?.user as any)?.username;

  return (
    <div className="w-full">
      <CCEventsManager isAuthenticated={isAuthenticated || false} />
    </div>
  );
}