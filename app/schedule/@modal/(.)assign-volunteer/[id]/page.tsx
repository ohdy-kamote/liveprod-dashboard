import CpAssignVolunteer from "@/components/AssignVolunteer";
import { AssignVolunteerModal as Modal } from "./modal";
import { getAllVolunteersPopulated, getScheduleById } from '@/utils/apis/get';
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";

export default async function AssignVolunteer({ params }: { params: { id: string }}) {
  const volunteersRes = await getAllVolunteersPopulated();
  const scheduleRes = await getScheduleById(params.id);

  const volunteers = volunteersRes.data.map((volunteer: any) => {
    const res = {
      _id: volunteer._id,
      name: volunteer.name,
      available: true,
      message: "",
      prevSchedId: "",
      role: ""
    };

    for (let i = 0; i < volunteer?.schedules?.length || 0; i++) {
      const volunteerSchedule = volunteer.schedules[i];
      if (volunteerSchedule.date === scheduleRes.data.date && volunteerSchedule.service === scheduleRes.data.service) {
        res.available = false;
        res.message = `${volunteer.name} is already assigned to this service as ${volunteerSchedule.role}. Override schedule?`;
        res.prevSchedId = volunteerSchedule._id;
        res.role = volunteerSchedule.role;
        break;
      }
    }
    return res;
  });

  return (
    <Modal>
      <Suspense fallback={<LoadingComponent />}>
        <CpAssignVolunteer volunteers={volunteers} schedule={scheduleRes.data} />
      </Suspense>
    </Modal>
  );
}
