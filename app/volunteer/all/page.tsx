import dynamic from 'next/dynamic';
import { getAllVolunteers } from '@/utils/apis/get';
import LoadingComponent from '@/components/Loading';
import { Suspense } from 'react';
const CpAllVolunteers = dynamic(() => import('@/components/AllVolunteers'), {ssr: false});

export default async function AllVolunteers() {
  const volunteers = await getAllVolunteers();

	return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="flex justify-center">
        <div className="w-full">
          <CpAllVolunteers data={volunteers.data} />
        </div>
      </div>
    </Suspense>
	);
};
