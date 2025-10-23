import { redirect } from "next/navigation";

async function getVolunteerByVolunteerId(volunteerId: string) {
  try {
    // Use proper base URL for different environments
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL 
      ? process.env.NEXTAUTH_URL
      : 'http://localhost:3000';
    
    console.log('Fetching volunteer with ID:', volunteerId, 'from:', baseUrl);
    
    const response = await fetch(`${baseUrl}/api/volunteers/by-id/${volunteerId}`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      console.log('API Response not ok:', response.statusText);
      return null;
    }
    
    const result = await response.json();
    console.log('API Response data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching volunteer:', error);
    return null;
  }
}

export default async function VolunteerByIdPage({ params }: { params: { volunteerId: string } }) {
  const result = await getVolunteerByVolunteerId(params.volunteerId);
  
  if (!result || !result.data) {
    console.log('Volunteer not found:', params.volunteerId);
    // Try to redirect with error message
    redirect("/volunteer/all?error=volunteer-not-found");
  }
  
  console.log('Redirecting to profile:', result.data._id);
  // Redirect to the regular profile page using the MongoDB _id
  redirect(`/volunteer/profile/${result.data._id}`);
}