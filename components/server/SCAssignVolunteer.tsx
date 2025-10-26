import CCAssignVolunteer from "@/components/client/CCAssignVolunteer";
import { getScheduleById, getFilteredSchedules } from '@/utils/apis/get';
import { eq } from "@/utils/dates";
import connectMongoDB from "@/libs/mongodb";
import Volunteer from "@/models/volunteer";
import Schedule from "@/models/schedule";

export default async function SCAssignVolunteer({ id }: { id: string }) {
  // Get volunteers directly from database
  await connectMongoDB();
  const volunteersData = await Volunteer.find({ active: true });
  const volunteersRes = { data: volunteersData };
  
  const scheduleRes = await getScheduleById(id);
  const adjacentSchedules = await getFilteredSchedules({
    date: scheduleRes.data.date,
    role: scheduleRes.data.role
  });
  const adjacentSchedulesGrouped = adjacentSchedules.data.reduce(
    (acc: any, item: any) => {
      if (item.service === "sunday1" || item.service === "sunday2") {
        acc.am.push(item._id);
      } else if (item.service === "sunday3" || item.service === "sunday4") {
        acc.pm.push(item._id);
      } else if (item.service === "sns1" || item.service === "sns2") {
        acc.sns.push(item._id);
      }
      return acc;
    },
    { am: [], pm: [], sns: [] } as { am: string[]; pm: string[], sns: string[] }
  );

  const volunteers = volunteersRes.data.map((volunteer: any) => {
    const res = {
      _id: volunteer._id,
      name: volunteer.name,
      roles: volunteer.roles,
      available: true,
      message: "",
      prevSchedId: "",
      role: ""
    };

    // Skip schedule conflict checking for now since we removed populate
    // This will be handled by the assignment logic
    return res;
  });

  return (
    <CCAssignVolunteer volunteers={volunteers} schedule={scheduleRes.data} schedulesGrouped={adjacentSchedulesGrouped} />
  );
}
