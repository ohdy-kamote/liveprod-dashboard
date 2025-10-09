import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { volunteerId: string } }) {
  try {
    await connectMongoDB();
    const volunteer = await Volunteer.findOne({ volunteerId: params.volunteerId }).populate("schedules");
    
    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }
    
    return NextResponse.json({ data: volunteer });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}