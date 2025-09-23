# Google Calendar Sync

## 1) Prerequisites
- Enable Google Calendar API in Google Cloud.
- Create a Service Account and download the JSON key.
- Share your target Google Calendar with the service account email (see calendar UI → Settings and sharing → Share with specific people → Add service account email → "Make changes to events" not required, "See all event details" is enough for read-only).

## 2) Environment variables
Add the following to `.env.local` (escape newlines in private key):

GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nLINE1\nLINE2\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
CRON_SECRET=choose_a_long_random_string
NEXT_PUBLIC_BASE_URL=https://your-domain.com

For local dev, set `NEXT_PUBLIC_BASE_URL=http://localhost:3000`.

## 3) Manual Sync (Admin-only)
- Visit `/schedule/calendar`
- Click the "Sync Google Calendar" button (only visible to admins)
- This calls `POST /api/calendar/sync` with the `x-admin-sync: 1` header.

## 4) Automated Sync (Vercel Cron)
- In Vercel → Project → Settings → Cron Jobs → Add Job
  - Schedule: e.g., `0 * * * *` (every hour) or `0 6 * * *` (6AM daily)
  - Target: `POST` to `/api/calendar/sync`
  - Add header `x-cron-secret: {CRON_SECRET}`
- Ensure `CRON_SECRET` env variable is set in Vercel to the same value.

## 5) Data model
We store Google events in `gcal_events` collection:
- externalId (GCal event id, unique)
- title, start, end, description, location, colorId
- source: "gcal"
- updatedAt

## 6) Rendering
`SCMonthlyCalendar` fetches and merges:
- Your schedule events
- GCal events (green color, class `gcal-event`)

GCal events are read-only in the UI.

## 7) Troubleshooting
- 401 Unauthorized on cron: Check `CRON_SECRET` header and env.
- No events: The calendar may not be shared with the service account.
- Private key issues: Ensure `\n` newlines are escaped in env.
- Wrong time zone: GCal returns ISO; we render as-is. Adjust mapping if needed.
