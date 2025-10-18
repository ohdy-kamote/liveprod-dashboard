import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import ObserverLog from '@/models/observerLog';

export async function POST() {
  try {
    await connectMongoDB();
    
    // Find all observer logs
    const logs = await ObserverLog.find().sort({ createdAt: 1 });
    
    // Group by volunteerId and keep only the first (oldest) entry
    const seen = new Set();
    const duplicates = [];
    
    for (const log of logs) {
      const volunteerIdStr = log.volunteerId.toString();
      if (seen.has(volunteerIdStr)) {
        duplicates.push(log._id);
      } else {
        seen.add(volunteerIdStr);
      }
    }
    
    // Remove duplicates
    if (duplicates.length > 0) {
      await ObserverLog.deleteMany({ _id: { $in: duplicates } });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Removed ${duplicates.length} duplicate observer logs`
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to cleanup duplicates' 
    }, { status: 500 });
  }
}