import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";

export default async function VolunteerByIdPage({ params }: { params: { volunteerId: string } }) {
  try {
    await connectMongoDB();
    const volunteer = await Volunteer.findOne({ volunteerId: params.volunteerId });
    
    if (!volunteer) {
      redirect("/volunteer/all");
    }
    
    redirect(`/volunteer/profile/${volunteer._id}`);
  } catch (error) {
    redirect("/volunteer/all");
  }
}