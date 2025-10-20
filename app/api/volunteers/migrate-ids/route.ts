import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { generateVolunteerId } from "@/utils/volunteerIdGenerator";

export async function POST() {
  try {
    await connectMongoDB();
    
    // Find all volunteers without volunteerId or with old format
    const volunteers = await Volunteer.find({
      $or: [
        { volunteerId: { $exists: false } },
        { volunteerId: null },
        { volunteerId: "" },
        { volunteerId: { $regex: /^CCF-LP-/ } } // Old format
      ]
    });

    let updated = 0;
    
    for (const volunteer of volunteers) {
      const newId = await generateVolunteerId(volunteer.segment);
      await Volunteer.findByIdAndUpdate(volunteer._id, { volunteerId: newId });
      updated++;
    }

    return NextResponse.json({ 
      message: `Successfully updated ${updated} volunteer IDs to new A000000 format`,
      updated 
    });
    
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}