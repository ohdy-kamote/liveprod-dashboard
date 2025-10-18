import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import ObserverLog from '@/models/observerLog';
import Volunteer from '@/models/volunteer';

export async function POST() {
  try {
    await connectMongoDB();
    
    const logs = await ObserverLog.find({ 
      status: { $in: ['monitoring', 'review_pending'] }
    }).populate('volunteerId');

    let updatedCount = 0;

    for (const log of logs) {
      const daysSinceStart = log.startDate ? 
        Math.floor((Date.now() - new Date(log.startDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
      
      const trialPeriodDays = (log.trialDuration || 4) * 7; // weeks to days
      const hasRecentEvaluations = log.evaluations.some(evaluation => 
        (Date.now() - new Date(evaluation.date).getTime()) < (30 * 24 * 60 * 60 * 1000) // 30 days
      );

      // Recalculate progress score
      log.progressScore = log.calculateProgressScore();

      // Automated status logic
      if (log.evaluations.length >= 3) {
        if (log.progressScore >= 80) {
          // Satisfactory → Active Volunteer
          log.status = 'active';
          await Volunteer.findByIdAndUpdate(log.volunteerId._id, { status: 'active' });
          updatedCount++;
        } else if (log.progressScore >= 60) {
          // Needs improvement → Extend period
          log.trialDuration += 2; // Extend by 2 weeks
          log.status = 'monitoring';
          updatedCount++;
        } else if (!hasRecentEvaluations && daysSinceStart > trialPeriodDays) {
          // Inactive → Pending Follow-up
          log.status = 'inactive';
          await Volunteer.findByIdAndUpdate(log.volunteerId._id, { status: 'pending_followup' });
          updatedCount++;
        }
      } else if (daysSinceStart > trialPeriodDays && !hasRecentEvaluations) {
        // No evaluations and trial period exceeded
        log.status = 'inactive';
        await Volunteer.findByIdAndUpdate(log.volunteerId._id, { status: 'pending_followup' });
        updatedCount++;
      }

      await log.save();
    }

    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updatedCount} observer statuses`,
      totalProcessed: logs.length
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update observer statuses' 
    }, { status: 500 });
  }
}