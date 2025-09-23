import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { fetchGCalEvents } from "@/utils/gcal";
import { fetchIcsEvents } from "@/utils/ics";
import GCalEvent from "@/models/gcalEvent";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const isAdminTrigger = request.headers.get("x-admin-sync") === "1" && !!session?.user?.username;
    const cronSecret = request.headers.get("x-cron-secret");
    const isCron = !!process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET;

    if (!isAdminTrigger && !isCron) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const from = new Date(now);
    from.setMonth(from.getMonth() - 3);
    const to = new Date(now);
    to.setMonth(to.getMonth() + 6);

    await connectMongoDB();

    let upserts = 0;
    const icsUrl = process.env.GOOGLE_CALENDAR_ICS_URL;

    if (icsUrl) {
      // Prefer ICS if provided
      const items = await fetchIcsEvents(icsUrl);
      for (const ev of items) {
        if (!ev.uid || !ev.start || !ev.end) continue;
        // Only within range
        if (ev.end < from || ev.start > to) continue;

        await GCalEvent.updateOne(
          { externalId: ev.uid },
          {
            $set: {
              externalId: ev.uid,
              title: ev.summary || "Untitled",
              start: ev.start,
              end: ev.end,
              description: ev.description || "",
              location: ev.location || "",
              colorId: null,
              source: "gcal",
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
        upserts++;
      }
    } else {
      // Fallback to Google Calendar API (service account)
      const rawEvents = await fetchGCalEvents(from.toISOString(), to.toISOString());
      for (const ev of rawEvents) {
        const startISO = ev.start?.dateTime || ev.start?.date;
        const endISO = ev.end?.dateTime || ev.end?.date;
        if (!ev.id || !startISO || !endISO) continue;

        await GCalEvent.updateOne(
          { externalId: ev.id },
          {
            $set: {
              externalId: ev.id,
              title: ev.summary || "Untitled",
              start: new Date(startISO),
              end: new Date(endISO),
              description: ev.description || "",
              location: ev.location || "",
              colorId: ev.colorId || null,
              source: "gcal",
              updatedAt: ev.updated ? new Date(ev.updated) : new Date(),
            },
          },
          { upsert: true }
        );
        upserts++;
      }
    }

    return NextResponse.json({ upserts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Sync failed" }, { status: 500 });
  }
}
