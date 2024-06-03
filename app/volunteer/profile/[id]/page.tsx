import CpCalendarSchedule from "@/components/CalendarSchedule";
import CpInputText from "@/components/InputText";
import CpSelect from "@/components/Select";
import CpVolunteerProfile from "@/components/VolunteerProfile";
import { getVolunteerById } from "@/utils/apis/get";
import { category, color, serviceTime } from "@/utils/constants";
import { diff } from "@/utils/dates";
import { redirect } from "next/navigation";
import { IoPersonCircleSharp, IoSaveSharp } from "react-icons/io5";

export default async function VolunteerProfile({ params }: { params: { id: string }}) {
  try {
    const res = await getVolunteerById(params.id);
    const volunteer = res.data;
    const from = (date: string, service: string): Date => {
      return new Date(`${new Date(date).toLocaleDateString()} ${serviceTime[service]}`);
    }
    const to = (from: Date): Date => {
      return new Date(from.setHours(from.getHours() + 2))
    }
    const schedule: any[] = [];
    let lastSchedule = new Date().getTime();

    for (let i = 0; i < volunteer?.schedules?.length; i++) {
      const sched = volunteer.schedules[i];
      const newSchedule = new Date(from(sched.date, sched.service)).getTime();
      if (newSchedule > lastSchedule) {
        lastSchedule = newSchedule;
      }

      schedule.push({
        id: sched._id,
        title: sched.role.toUpperCase(),
        start: from(sched.date, sched.service),
        end: to(from(sched.date, sched.service))
      });
    }

    const length = diff(new Date(), new Date(lastSchedule), "day");

    return (
      <CpVolunteerProfile volunteer={volunteer} />
    )
  } catch (error) {
    redirect("/");
  }
}
