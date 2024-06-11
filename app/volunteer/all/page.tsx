import dynamic from 'next/dynamic';
import { getAllVolunteers } from '@/utils/apis/get';
import LoadingComponent from '@/components/Loading';
import { Suspense } from 'react';
import { checkAuth } from '@/utils/helpers';
const CpAllVolunteers = dynamic(() => import('@/components/AllVolunteers'), {ssr: false});

export default async function AllVolunteers() {
  const volunteers = await getAllVolunteers();
  const isAuthenticated = await checkAuth();

	return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="flex justify-center">
        <div className="w-full">
          <CpAllVolunteers data={volunteers.data} isAdmin={isAuthenticated} />
        </div>
      </div>
    </Suspense>
	);
};
