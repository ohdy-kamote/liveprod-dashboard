import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({title, description});
  return NextResponse.json({message: "Topic Created"}, {status: 201});
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({data: topics}, {status: 200});
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  const topic = await Topic.findByIdAndDelete(id);
  return NextResponse.json({message: `${topic.title} deleted`}, {status: 200});
}
