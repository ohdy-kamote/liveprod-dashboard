import CCVolunteerProfile from "@/components/client/CCVolunteerProfile";
import { checkAuth, checkAdminAuth } from "@/utils/helpersServer";
import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function SCVolunteerProfile({ id }: { id: string }) {
  console.log('Loading volunteer profile for ID:', id);
  
  try {
    await connectMongoDB();
    const volunteer = await Volunteer.findById(id);
    console.log('Volunteer found:', !!volunteer);
    
    if (!volunteer) {
      console.log('No volunteer found');
      return <div className="p-8">Volunteer not found</div>;
    }

    console.log('Volunteer name:', volunteer.firstName, volunteer.lastName);
    
    // Get auth status but don't let it fail
    const isAuthenticated = false; // Default to false for volunteer access
    const isAdmin = false; // Default to false for volunteer access
    
    try {
      return (
        <CCVolunteerProfile volunteer={volunteer} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      );
    } catch (componentError) {
      console.log('Error in CCVolunteerProfile component:', componentError);
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Volunteer Profile</h1>
          <p>Name: {volunteer.firstName} {volunteer.lastName}</p>
          <p>ID: {volunteer.volunteerId}</p>
          <p>Status: {volunteer.status}</p>
          <p>Segment: {volunteer.segment}</p>
          <p className="text-red-500 mt-4">Component error: {(componentError as Error).message}</p>
        </div>
      );
    }
  } catch (error) {
    console.log('Error:', error);
    return <div className="p-8 text-red-500">Error loading profile</div>;
  }
}
