# Notifications via Textbee – Cron Setup

## Environment
- TEXTBEE_API_KEY: from Textbee dashboard
- TEXTBEE_DEVICE_ID: your device id
- CRON_SECRET: long random string; used to authorize cron calls

## Endpoint
- POST /api/notifications/run
  - Sends reminders to volunteers scheduled exactly 2 days from now (Asia/Manila)
  - Accepts either header:
    - x-cron-secret: {CRON_SECRET}  (for automated calls)
    - or x-admin-sync: 1 with a logged-in admin session (manual trigger)

## Vercel Cron
- vercel.json includes:
```
{
  "crons": [
    {
      "path": "/api/notifications/run",
      "schedule": "0 6 * * *",
      "method": "POST",
      "headers": {
        "x-cron-secret": "@cron_secret"
      }
    }
  ]
}
```
- In Vercel Project → Settings → Environment Variables:
  - Add `cron_secret` (value must equal CRON_SECRET)
  - Add `TEXTBEE_API_KEY`, `TEXTBEE_DEVICE_ID`, `CRON_SECRET`

## Local test
```
curl -X POST http://localhost:3000/api/notifications/run -H "x-cron-secret: YOUR_CRON_SECRET"
```

## Notes
- The query matches schedules by date-only window (midnight to midnight Asia/Manila) two days ahead.
- Ensure volunteer.phone is populated for recipients.















