import { redirect } from "next/navigation";

async function getVolunteerByVolunteerId(volunteerId: string) {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    
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
  const result = await getVolunteerByVolunteerId(params.volunteerId);
  
  if (!result || !result.data) {
    redirect("/volunteer/all");
  }
  
  redirect(`/volunteer/profile/${result.data._id}`);
}