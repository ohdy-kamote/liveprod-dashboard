import { google } from "googleapis";

export interface RawGCalEvent {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  start?: { dateTime?: string; date?: string; };
  end?: { dateTime?: string; date?: string; };
  updated?: string;
}

export async function fetchGCalEvents(fromISO: string, toISO: string, calendarId?: string) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || "";
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const calId = calendarId || process.env.GOOGLE_CALENDAR_ID || "";

  if (!clientEmail || !privateKey || !calId) {
    throw new Error("Missing Google Calendar credentials (GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID)");
  }

  const jwt = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey,
    ["https://www.googleapis.com/auth/calendar.readonly"],
  );

  const calendar = google.calendar({ version: "v3", auth: jwt });
  const res = await calendar.events.list({
    calendarId: calId,
    timeMin: new Date(fromISO).toISOString(),
    timeMax: new Date(toISO).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 2500,
  });

  return (res.data.items || []) as RawGCalEvent[];
}
