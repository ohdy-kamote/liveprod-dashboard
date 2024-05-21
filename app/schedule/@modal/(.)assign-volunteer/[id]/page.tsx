import AssignVolunteer from "@/components/AssignVolunteer";
import { AssignVolunteerModal as Modal } from "./modal";
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";

export default function Page({ params }: { params: { id: string }}) {
  return (
    <Modal>
      <Suspense fallback={<LoadingComponent />}>
        <AssignVolunteer scheduleId={params.id} />
      </Suspense>
    </Modal>
  );
}
