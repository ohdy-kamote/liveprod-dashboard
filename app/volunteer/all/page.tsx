import LoadingComponent from '@/components/Loading';
import SCAllVolunteers from '@/components/server/SCAllVolunteers';
import { Suspense } from 'react';

export default function AllVolunteers() {
	return (
    <Suspense fallback={<LoadingComponent />}>
      <SCAllVolunteers />
    </Suspense>
	)
}
