import CCVolunteerProfile from "@/components/client/CCVolunteerProfile";
import { checkAuth, checkAdminAuth } from "@/utils/helpersServer";
import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function SCVolunteerProfile({ id }: { id: string }) {
  try {
    console.log('Loading volunteer profile for ID:', id);
    const isAuthenticated = await checkAuth();
    const isAdmin = await checkAdminAuth();
    console.log('Auth check complete. Authenticated:', isAuthenticated, 'Admin:', isAdmin);

    await connectMongoDB();
    const volunteer = await Volunteer.findById(id);
    console.log('Database query complete. Volunteer found:', !!volunteer);
    if (volunteer) {
      console.log('Volunteer data:', JSON.stringify(volunteer, null, 2));
    }
    
    if (!volunteer) {
      console.log('No volunteer found, redirecting to home');
      redirect("/");
    }

    console.log('Rendering volunteer profile for:', volunteer.firstName, volunteer.lastName);
    // Allow access to volunteer profile even without authentication
    // This enables volunteer ID lookup functionality
    return (
      <CCVolunteerProfile volunteer={volunteer} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
    )
  } catch (error) {
    console.log('Error in volunteer profile:', error);
    redirect("/");
  }
}
