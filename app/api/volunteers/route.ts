import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import { NextResponse } from "next/server";

interface RequestData {
  name: string
  segment: string
  tier: string
}

export async function POST(request: any) {
  const requestData: RequestData = await request.json();
  await connectMongoDB();
  try {
    await Volunteer.create(requestData);
    return NextResponse.json({message: `${requestData.name} was added as ${requestData.segment} volunteer.`}, {status: 201});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}

export async function GET() {
  await connectMongoDB();
  const volunteers = await Volunteer.find();
  return NextResponse.json({data: volunteers}, {status: 200});
}
