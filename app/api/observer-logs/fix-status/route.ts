import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import ObserverLog from '@/models/observerLog';

export async function POST() {
  try {
    await connectMongoDB();
    
    await ObserverLog.updateMany(
      { status: 'orientation_scheduled' },
      { status: 'orientation' }
    );

    return NextResponse.json({ success: true, message: 'Updated statuses' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}