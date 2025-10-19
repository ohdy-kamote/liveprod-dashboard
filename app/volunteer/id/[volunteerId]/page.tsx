import { redirect } from "next/navigation";

async function getVolunteerByVolunteerId(volunteerId: string) {
  try {
    // For server-side calls, use relative URL or construct proper absolute URL
    let baseUrl = 'http://localhost:3000';
    
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXTAUTH_URL) {
      baseUrl = process.env.NEXTAUTH_URL;
    }
    
    const response = await fetch(`${baseUrl}/api/volunteers/by-id/${volunteerId}`, {
      cache: "no-store"
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    return null;
  }
}

export default async function VolunteerByIdPage({ params }: { params: { volunteerId: string } }) {
  try {
    const result = await getVolunteerByVolunteerId(params.volunteerId);
    
    if (!result || !result.data) {
      console.log('Volunteer not found:', params.volunteerId);
      redirect("/volunteer/all");
    }
    
    console.log('Redirecting to profile:', result.data._id);
    // Redirect to the regular profile page using the MongoDB _id
    redirect(`/volunteer/profile/${result.data._id}`);
  } catch (error) {
    console.error('Error in volunteer ID lookup:', error);
    redirect("/volunteer/all");
  }
}