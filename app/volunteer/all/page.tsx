import dynamic from 'next/dynamic';
import { getAllVolunteers } from '@/utils/apis/get';
import LoadingComponent from '@/components/Loading';
import { Suspense } from 'react';
const AllVolunteers = dynamic(() => import('@/components/AllVolunteers'), {ssr: false});

export default async function Page() {
  const volunteers = await getAllVolunteers();

	return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="flex justify-center">
        <div className="w-3/4">
          <AllVolunteers data={volunteers.data} />
        </div>
      </div>
    </Suspense>
	);
};
