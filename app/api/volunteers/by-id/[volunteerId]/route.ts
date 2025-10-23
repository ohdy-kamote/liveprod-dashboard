import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { volunteerId: string } }) {
  try {
    console.log('API: Looking up volunteer ID:', params.volunteerId);
    
    await connectMongoDB();
    console.log('API: Connected to MongoDB');
    
    // Try exact match first
    let volunteer = await Volunteer.findOne({ volunteerId: params.volunteerId });
    
    // If not found, try case-insensitive search
    if (!volunteer) {
      console.log('API: Exact match not found, trying case-insensitive search');
      volunteer = await Volunteer.findOne({ 
        volunteerId: { $regex: new RegExp(`^${params.volunteerId}$`, 'i') } 
      });
    }
    
    // If still not found, try searching by old CCF-LP format
    if (!volunteer && !params.volunteerId.startsWith('CCF-LP-')) {
      console.log('API: Trying old CCF-LP format search');
      volunteer = await Volunteer.findOne({ 
        volunteerId: { $regex: new RegExp(`CCF-LP-.*${params.volunteerId}`, 'i') } 
      });
    }
    
    console.log('API: Database query result:', volunteer ? 'Found' : 'Not found');
    
    if (!volunteer) {
      // Log some sample volunteer IDs for debugging
      const sampleVolunteers = await Volunteer.find({}).limit(3).select('volunteerId name');
      console.log('API: Sample volunteer IDs in database:', sampleVolunteers.map(v => v.volunteerId));
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