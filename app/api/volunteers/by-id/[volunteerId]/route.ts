import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { volunteerId: string } }) {
  try {
    console.log('API: Looking up volunteer ID:', params.volunteerId);
    
    await connectMongoDB();
    console.log('API: Connected to MongoDB');
    
    const volunteer = await Volunteer.findOne({ volunteerId: params.volunteerId });
    console.log('API: Database query result:', volunteer ? 'Found' : 'Not found');
    
    if (!volunteer) {
      console.log('API: Volunteer not found for ID:', params.volunteerId);
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }
    
    console.log('API: Returning volunteer data for:', volunteer.name);
    return NextResponse.json({ data: volunteer });
  } catch (error: any) {
    console.error('API: Error in volunteer lookup:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}