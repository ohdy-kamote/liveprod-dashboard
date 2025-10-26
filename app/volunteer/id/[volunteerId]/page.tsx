import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function VolunteerByIdPage({ params }: { params: { volunteerId: string } }) {
  console.log('Looking up volunteer ID:', params.volunteerId);
  await connectMongoDB();
  const volunteer = await Volunteer.findOne({ volunteerId: params.volunteerId });
  
  if (!volunteer) {
    console.log('Volunteer not found, redirecting to /volunteer/all');
    redirect("/volunteer/all");
  }
  
  console.log('Volunteer found, redirecting to profile:', volunteer._id);
  redirect(`/volunteer/profile/${volunteer._id}`);
}