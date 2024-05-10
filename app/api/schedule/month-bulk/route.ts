import connectMongoDB from "@/libs/mongodb";
import Schedule from "@/models/schedule";
import { createSnsMonthPayload, createSundayMonthPayload } from "@/utils/helpers";
import { NextResponse } from "next/server";

interface RequestData {
  year: number
  month: number
}

export async function POST(request: any) {
  const requestData: RequestData = await request.json();
  const sns = createSnsMonthPayload(requestData.year, requestData.month-1);
  const sundayService = createSundayMonthPayload(requestData.year, requestData.month-1);
  await connectMongoDB();
  try {
    await Schedule.insertMany(sns.concat(sundayService));
    return NextResponse.json({message: "Month schedule added"}, {status: 201});
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
