import connectMongoDB from "@/libs/mongodb";
import Schedule from "@/models/schedule";
import { callTextbee } from "@/utils/apis/textbee";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

async function handleNotifications(request: Request) {
  const session = await auth();
  const isAdminTrigger = request.headers.get("x-admin-sync") === "1" && !!session?.user?.username;
  const cronSecret = request.headers.get("x-cron-secret");
  const isCron = !!process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET;

  if (!isAdminTrigger && !isCron) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectMongoDB();

  const now = new Date();
  const manilaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const targetDate = new Date(manilaNow);
  targetDate.setDate(manilaNow.getDate() + 2);

  // Normalize to midnight for matching by date-only
  targetDate.setHours(0, 0, 0, 0);

  // Find schedules with same date (date-only match)
  const start = new Date(targetDate);
  const end = new Date(targetDate);
  end.setDate(end.getDate() + 1);

  const schedules = await Schedule.find({
    date: { $gte: start, $lt: end }
  }).populate("volunteer");

  let sent = 0;
  for (const sched of schedules) {
    const volunteer: any = sched.volunteer;
    if (!volunteer || !volunteer.phone) continue;

    const day = targetDate.toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Manila" });
    const msg = `Hi ${volunteer.firstName || volunteer.name}, gentle reminder: you are scheduled as ${sched.role} on ${day}, ${targetDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}.`;

    await callTextbee({ to: volunteer.phone, message: msg });
    sent++;
  }

  return NextResponse.json({ message: "Notifications processed", sent }, { status: 200 });
}

export async function GET(request: Request) {
  try {
    return await handleNotifications(request);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to run notifications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return await handleNotifications(request);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to run notifications" }, { status: 500 });
  }
}















