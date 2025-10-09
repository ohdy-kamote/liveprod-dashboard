import dynamic from 'next/dynamic';
import { getAllVolunteers } from '@/utils/apis/get';
import { checkAdminAuth } from '@/utils/helpersServer';
const CCAllVolunteers = dynamic(() => import('@/components/client/CCAllVolunteers'), {ssr: false});

export default async function SCAllVolunteers() {
  const volunteers = await getAllVolunteers();
  const isAdmin = await checkAdminAuth();

	return (
    <CCAllVolunteers data={volunteers.data} isAdmin={isAdmin} />
	)
}
