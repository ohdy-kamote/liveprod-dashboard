import { redirect } from "next/navigation";

async function getVolunteerByVolunteerId(volunteerId: string) {
  try {
    const response = await fetch(`${process.env.SOURCE_URL}/api/volunteers/by-id/${volunteerId}`, {
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
  
  // Redirect to the regular profile page using the MongoDB _id
  redirect(`/volunteer/profile/${result.data._id}`);
}