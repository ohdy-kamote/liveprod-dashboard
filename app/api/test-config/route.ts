import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    source_url: process.env.SOURCE_URL || process.env.NEXT_PUBLIC_SOURCE_URL || 'not set',
    mongodb_uri_exists: !!process.env.MONGODB_URI,
    mongodb_uri_length: process.env.MONGODB_URI?.length || 0,
    environment: process.env.NODE_ENV,
  }, { status: 200 });
}