import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { generateVolunteerId } from "@/utils/volunteerIdGenerator";
import { NextResponse } from "next/server";

interface RequestData {
  firstName: string
  lastName: string
  nickName?: string
  segment: string
  status: string
}

export async function POST(request: any) {
  const requestData: RequestData = await request.json();

  try {
    await connectMongoDB();
    const volunteerId = await generateVolunteerId();
    const updateData = {
      volunteerId,
      name: `${requestData.firstName} ${requestData.lastName}`,
      ...requestData
    }

    await Volunteer.create(updateData);
    return NextResponse.json({message: `${updateData.name} was added as ${updateData.segment} volunteer.`}, {status: 201});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}

export async function GET() {
  await connectMongoDB();
  
  // Get volunteers sorted by lastName
  const volunteers = await Volunteer.find().select("-schedules -createdAt -updatedAt").sort({ lastName: 1 });
  
  // Check for volunteers needing IDs (no ID or sequential ID)
  const volunteersNeedingIds = volunteers.filter(v => 
    !v.volunteerId || /^CCF-LP-0\d{4}$/.test(v.volunteerId)
  );
  
  if (volunteersNeedingIds.length > 0) {
    const { generateVolunteerId } = await import('@/utils/volunteerIdGenerator');
    
    // Assign random IDs to volunteers without them or with sequential IDs
    for (const volunteer of volunteersNeedingIds) {
      const volunteerId = await generateVolunteerId();
      await Volunteer.findByIdAndUpdate(volunteer._id, { volunteerId });
      volunteer.volunteerId = volunteerId;
    }
  }
  
  return NextResponse.json({data: volunteers}, {status: 200});
}

export async function PUT(request: any) {
  const requestData = await request.json();
  await connectMongoDB();
  try {
    await Volunteer.updateMany({}, {...requestData});
    return NextResponse.json({message: "All volunteers' status updated."}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
