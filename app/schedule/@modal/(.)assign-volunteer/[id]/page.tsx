import AssignVolunteer from "@/components/AssignVolunteer";
import { AssignVolunteerModal as Modal } from "./modal";

export default function Page({ params }: { params: { id: string }}) {
  return (
    <Modal>
      <AssignVolunteer scheduleId={params.id} />
    </Modal>
  );
}
