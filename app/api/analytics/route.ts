import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Volunteer from '@/models/volunteer';
import Schedule from '@/models/schedule';
import Training from '@/models/training';

export async function GET() {
  try {
    await connectMongoDB();

    // Volunteer Analytics
    const totalVolunteers = await Volunteer.countDocuments();
    const activeVolunteers = await Volunteer.countDocuments({ status: 'active' });
    const volunteersByStatus = await Volunteer.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const volunteersByGender = await Volunteer.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);
    const volunteersBySegment = await Volunteer.aggregate([
      { $group: { _id: '$segment', count: { $sum: 1 } } }
    ]);

    // Role Analytics
    const roleStats = await Volunteer.aggregate([
      { $unwind: '$roles' },
      { $group: { _id: '$roles', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Schedule Analytics (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSchedules = await Schedule.countDocuments({
      date: { $gte: thirtyDaysAgo }
    });

    const schedulesByRole = await Schedule.aggregate([
      { $match: { date: { $gte: thirtyDaysAgo } } },
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Training Analytics
    const totalTrainings = await Training.countDocuments();
    const recentTrainings = await Training.countDocuments({
      date: { $gte: thirtyDaysAgo }
    });

    const analytics = {
      volunteers: {
        total: totalVolunteers,
        active: activeVolunteers,
        byStatus: volunteersByStatus,
        byGender: volunteersByGender,
        bySegment: volunteersBySegment
      },
      roles: roleStats,
      schedules: {
        recent: recentSchedules,
        byRole: schedulesByRole
      },
      trainings: {
        total: totalTrainings,
        recent: recentTrainings
      }
    };

    return NextResponse.json({ data: analytics }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}