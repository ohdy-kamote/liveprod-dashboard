import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { title, description } = await request.json();

  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, {title, description});
  return NextResponse.json({message: "Topic Updated"}, {status: 200});
}

export async function GET(request: any, { params }: any) {
  const { id } = params;

  await connectMongoDB();
  const topic = await Topic.findById(id);
  return NextResponse.json({data: topic}, {status: 200});
}
