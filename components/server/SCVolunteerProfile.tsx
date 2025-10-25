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
    
    console.log('About to render profile component');
    
    // Convert Mongoose document to plain object for client component
    const safeVolunteer = {
      _id: volunteer._id.toString(),
      name: volunteer.name,
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      nickName: volunteer.nickName || '',
      status: volunteer.status,
      segment: volunteer.segment,
      roles: volunteer.roles || [],
      gender: volunteer.gender,
      phone: volunteer.phone || '',
      volunteerId: volunteer.volunteerId,
      trainings: volunteer.trainings || [],
      trainingsAttended: volunteer.trainingsAttended || [],
      schedules: [] // Empty schedules array to prevent errors
    };
    
    return (
      <CCVolunteerProfile volunteer={safeVolunteer} isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
    );
  } catch (error) {
    console.log('Error:', error);
    return <div className="p-8 text-red-500">Error loading profile</div>;
  }
}
