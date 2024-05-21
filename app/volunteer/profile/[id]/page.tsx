import VolunteerProfile from "@/components/VolunteerProfile";
import { getVolunteerById } from "@/utils/apis/get";
import { serviceTime } from "@/utils/constants";
import { diff } from "@/utils/dates";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string }}) {
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
      <div>
        <h1>Name: {volunteer.name}</h1>
        <h1 className="capitalize">Tier: {volunteer.tier}</h1>
        <h1 className="capitalize">Segment: {volunteer.segment}</h1>
        <h1>Active: {volunteer.active ? "Yes" : "No"}</h1>
        <h1>Schedules:</h1>
        <VolunteerProfile events={schedule} length={length} />
      </div>
    );
  } catch (error) {
    redirect("/");
  }
}
