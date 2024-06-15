import LoadingComponent from "@/components/Loading";
import SCVolunteerProfile from "@/components/server/SCVolunteerProfile";
import { Suspense } from "react";

export default function VolunteerProfile({ params }: { params: { id: string }}) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <SCVolunteerProfile id={params.id} />
    </Suspense>
  )
}
