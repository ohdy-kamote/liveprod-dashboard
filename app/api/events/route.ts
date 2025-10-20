import connectMongoDB from "@/libs/mongodb";
import Event from "@/models/event";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const events = await Event.find({}).sort({ date: 1 });
    return NextResponse.json({ data: events }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    // Filter out N/A and empty values from assignedVolunteers
    if (eventData.assignedVolunteers) {
      const filteredVolunteers: any = {};
      Object.entries(eventData.assignedVolunteers).forEach(([key, value]) => {
        if (value && value !== "N/A" && value !== "") {
          filteredVolunteers[key] = value;
        }
      });
      eventData.assignedVolunteers = filteredVolunteers;
    }
    
    await connectMongoDB();
    
    const event = new Event(eventData);
    await event.save();
    
    return NextResponse.json({ message: "Event created successfully", data: event }, { status: 201 });
  } catch (error: any) {
    console.error('Event creation error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}