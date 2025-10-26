import dynamic from 'next/dynamic';
import { checkAdminAuth } from '@/utils/helpersServer';
import connectMongoDB from '@/libs/mongodb';
import Volunteer from '@/models/volunteer';
const CCAllVolunteers = dynamic(() => import('@/components/client/CCAllVolunteers'), {ssr: false});

export default async function SCAllVolunteers() {
  await connectMongoDB();
  const volunteers = await Volunteer.find({ active: true });
  const isAdmin = await checkAdminAuth();

  // Handle case where volunteers data might be undefined or have errors
  const volunteerData = volunteers || [];

	return (
    <CCAllVolunteers data={volunteerData} isAdmin={isAdmin} />
	)
}
