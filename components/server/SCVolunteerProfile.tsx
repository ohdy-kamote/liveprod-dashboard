import CCVolunteerProfile from "@/components/client/CCVolunteerProfile";
import { checkAuth, checkAdminAuth } from "@/utils/helpersServer";
import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function SCVolunteerProfile({ id }: { id: string }) {
  try {
    const isAuthenticated = await checkAuth();
    const isAdmin = await checkAdminAuth();

    await connectMongoDB();
    const volunteer = await Volunteer.findById(id).populate('schedules');
    
    if (!volunteer) {
      redirect("/");
    }

    // Allow access to volunteer profile even without authentication
    // This enables volunteer ID lookup functionality
    return (
      <CCVolunteerProfile volunteer={volunteer} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
    )
  } catch (error) {
    redirect("/");
  }
}
