import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import ObserverLog from '@/models/observerLog';
import Volunteer from '@/models/volunteer';

export async function POST() {
  try {
    await connectMongoDB();
    
    // Find volunteers with status as observer
    const observers = await Volunteer.find({
      status: 'observer'
    });

    let migratedCount = 0;
    
    for (const observer of observers) {
      // Check if observer log already exists
      const existingLog = await ObserverLog.findOne({ volunteerId: observer._id });
      
      if (!existingLog) {
        try {
          // Create new observer log with upsert to prevent race conditions
          await ObserverLog.findOneAndUpdate(
            { volunteerId: observer._id },
            {
              volunteerId: observer._id,
              stage: 'orientation',
              status: 'monitoring',
              trialDuration: 4,
              assignedSchedule: ['Sundays'],
              progressScore: 0
            },
            { upsert: true, new: true }
          );
          migratedCount++;
        } catch (error) {
          // Skip if duplicate key error (already exists)
          if (error.code !== 11000) {
            throw error;
          }
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Migrated ${migratedCount} observers to tracker`,
      totalObservers: observers.length
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to migrate observers',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}