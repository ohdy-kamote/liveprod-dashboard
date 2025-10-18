import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import ObserverLog from '@/models/observerLog';

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    
    const body = await request.json();
    const { volunteerId, mentorId, punctuality, attitude, initiative, participation, notes } = body;

    const observerLog = await ObserverLog.findOne({ volunteerId });
    if (!observerLog) {
      return NextResponse.json({ success: false, error: 'Observer log not found' }, { status: 404 });
    }

    // Add new evaluation
    observerLog.evaluations.push({
      mentorId,
      punctuality,
      attitude,
      initiative,
      participation,
      notes
    });

    // Update progress score
    observerLog.progressScore = observerLog.calculateProgressScore();
    
    // Auto-flag for review if average rating is high
    if (observerLog.progressScore >= 80 && observerLog.evaluations.length >= 3) {
      observerLog.status = 'review_pending';
    }

    await observerLog.save();
    await observerLog.populate('volunteerId', 'firstName lastName volunteerId');
    await observerLog.populate('assignedMentor', 'firstName lastName');

    return NextResponse.json({ success: true, data: observerLog });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add evaluation' }, { status: 500 });
  }
}