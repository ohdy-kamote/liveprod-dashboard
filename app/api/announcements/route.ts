import connectMongoDB from "@/libs/mongodb";
import Announcement from "@/models/announcement";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectMongoDB();
    const announcements = await Announcement.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ data: announcements });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const isAdmin = !!(session?.user as any)?.isAdmin;
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, message, theme } = await request.json();
    
    await connectMongoDB();
    const announcement = await Announcement.create({ title, message, theme });
    
    return NextResponse.json({ data: announcement, message: "Announcement created successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}