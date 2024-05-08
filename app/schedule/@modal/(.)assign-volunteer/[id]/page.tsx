import AssignVolunteer from "@/components/AssignVolunteer";
import { AssignVolunteerModal as Modal } from "./modal";

export default async function Page() {
  return (
    <Modal>
      <AssignVolunteer />
    </Modal>
  );
}
