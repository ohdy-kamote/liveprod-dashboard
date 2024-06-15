import { AssignVolunteerModal } from "./modal";
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";
import SCAssignVolunteer from "@/components/server/SCAssignVolunteer";

export default function AssignVolunteer({ params }: { params: { id: string }}) {
  return (
    <AssignVolunteerModal>
      <Suspense fallback={<LoadingComponent />}>
        <SCAssignVolunteer id={params.id} />
      </Suspense>
    </AssignVolunteerModal>
  );
}
