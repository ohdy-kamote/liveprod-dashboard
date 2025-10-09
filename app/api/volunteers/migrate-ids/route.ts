import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    const isAdmin = !!(session?.user as any)?.isAdmin;
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    // Find all volunteers (to update both existing and new ones with random IDs)
    const allVolunteers = await Volunteer.find({});
    const { generateVolunteerId } = await import('@/utils/volunteerIdGenerator');
    
    let updated = 0;
    for (const volunteer of allVolunteers) {
      // Generate new random ID for all volunteers
      const volunteerId = await generateVolunteerId();
      await Volunteer.findByIdAndUpdate(volunteer._id, { volunteerId });
      updated++;
    }
    
    return NextResponse.json({ 
      message: `Successfully added volunteer IDs to ${updated} volunteers`,
      updated 
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}