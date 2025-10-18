import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import ObserverLog from '@/models/observerLog';
import Volunteer from '@/models/volunteer';

export async function GET() {
  try {
    await connectMongoDB();
    
    const logs = await ObserverLog.find()
      .populate('volunteerId', 'firstName lastName volunteerId')
      .populate('assignedMentor', 'firstName lastName')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch observer logs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    
    const body = await request.json();
    const { _id, volunteerId, stage, ...logData } = body;

    let observerLog;
    
    if (_id) {
      // Update existing log by ID
      observerLog = await ObserverLog.findByIdAndUpdate(_id, logData, { new: true });
    } else {
      // Check if log already exists for this volunteer
      observerLog = await ObserverLog.findOne({ volunteerId });
      
      if (observerLog) {
        // Update existing log
        Object.assign(observerLog, logData);
        if (stage) observerLog.stage = stage;
        await observerLog.save();
      } else {
        // Create new log
        observerLog = new ObserverLog({ volunteerId, stage, ...logData });
        await observerLog.save();
      }
    }

    await observerLog.populate('volunteerId', 'firstName lastName volunteerId');
    await observerLog.populate('assignedMentor', 'firstName lastName');

    return NextResponse.json({ success: true, data: observerLog });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create/update observer log' }, { status: 500 });
  }
}