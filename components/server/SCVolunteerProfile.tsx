import CCVolunteerProfile from "@/components/client/CCVolunteerProfile";
import { getVolunteerById } from "@/utils/apis/get";
import { checkAuth, checkAdminAuth } from "@/utils/helpersServer";
import { redirect } from "next/navigation";

export default async function SCVolunteerProfile({ id }: { id: string }) {
  try {
    const isAuthenticated = await checkAuth();
    const isAdmin = await checkAdminAuth();

    const res = await getVolunteerById(id);
    const volunteer = res.data;

    // Allow access to volunteer profile even without authentication
    // This enables volunteer ID lookup functionality
    return (
      <CCVolunteerProfile volunteer={volunteer} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
    )
  } catch (error) {
    redirect("/volunteer/all");
  }
}
