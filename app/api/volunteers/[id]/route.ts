import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";
import "@/models/schedule";

interface RequestData {
  firstName?: string
  lastName?: string
  nickName?: string
  segment?: string
  status?: string
}

export async function PUT(request: any, { params }: any) {
  const requestData: RequestData = await request.json();

  try {
    await connectMongoDB();
    const volunteer = await Volunteer.findById(params.id);

    if (requestData.firstName && requestData.lastName) {
      volunteer.name = `${requestData.firstName} ${requestData.lastName}`;
    } else if (requestData.firstName) {
      volunteer.name = `${requestData.firstName} ${volunteer.lastName}`;
    } else if (requestData.lastName) {
      volunteer.name = `${volunteer.firstName} ${requestData.lastName}`;
    }

    Object.assign(volunteer, requestData);
    await volunteer.save();
    return NextResponse.json({message: `Volunteer info updated`}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}

export async function GET(request: any, { params }: any) {
  await connectMongoDB();
  const volunteer = await Volunteer.findById(params.id).populate("schedules", "date role service");
  return NextResponse.json({data: volunteer}, {status: 200});
}
