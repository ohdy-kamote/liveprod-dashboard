import { auth } from "@/auth";
import CCTrainingManager from "@/components/client/CCTrainingManager";

export default async function TrainingPage() {
  const session = await auth();
  const isAuthenticated = !!(session?.user as any)?.username;

  return (
    <div className="w-full">
      <CCTrainingManager isAuthenticated={isAuthenticated} />
    </div>
  );
}