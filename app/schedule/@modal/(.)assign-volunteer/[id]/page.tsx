import CpAssignVolunteer from "@/components/AssignVolunteer";
import { AssignVolunteerModal } from "./modal";
import { getAllVolunteersPopulated, getScheduleById } from '@/utils/apis/get';
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";
import USAssignVolunteer from "@/components/server/USAssignVolunteer";

export default function AssignVolunteer({ params }: { params: { id: string }}) {
  return (
    <AssignVolunteerModal>
      <Suspense fallback={<LoadingComponent />}>
        <USAssignVolunteer id={params.id} />
      </Suspense>
    </AssignVolunteerModal>
  );
}
