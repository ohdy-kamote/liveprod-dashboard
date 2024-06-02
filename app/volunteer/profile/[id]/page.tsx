import VolunteerProfile from "@/components/VolunteerProfile";
import { getVolunteerById } from "@/utils/apis/get";
import { serviceTime } from "@/utils/constants";
import { diff } from "@/utils/dates";
import { redirect } from "next/navigation";
import { HiPencilSquare } from "react-icons/hi2";
import { IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";

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
      <div className="px-32 text-slate-800">
        <div className="flex justify-between pb-7">
          <h1 className="text-2xl">Volunteer Profile</h1>
          <button className="bg-slate-900 text-white px-4 py-1 rounded-md">Edit</button>
        </div>
        <div className="w-full rounded-lg border border-slate-100 shadow-md">
          <div className="flex justify-start py-5 pl-6">
            <h2 className="font-semibold text-lg">Basic Info</h2>
          </div>
          <div className="bg-slate-300 h-px" />
          <div className="px-5 pb-5 pt-14">
            <div className="flex justify-start gap-3">
              <IoPersonCircleSharp size={100} />
              <div className="flex flex-col p-2 gap-3 justify-center">
                <h2 className="font-semibold text-lg">{volunteer.name}</h2>
                <button className="shadow-md w-fit pl-3 pr-2 font-semibold rounded-sm border border-slate-200 uppercase">
                  <div className="flex justify-start gap-2 py-px">
                      <p>Edit Info</p>
                      <HiPencilSquare size={20} />
                  </div>
                </button>
              </div>
            </div>
            <div className="px-3 pt-8 pb-5 text-sm">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-5">
                  <div className="flex flex-col gap-0.5 w-full">
                    <label htmlFor="input" className="text-slate-500 pl-3">First Name:</label>
                    <input type="text" name="firstName" value={volunteer.firstName} className="bg-zinc-100 rounded-sm border border-b-black px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-0.5 w-full">
                    <label htmlFor="input" className="text-slate-500 pl-3">Last Name:</label>
                    <input type="text" name="firstName" value={volunteer.lastName} className="bg-zinc-100 rounded-sm border border-b-black px-3 py-2 focus:outline-none" />
                  </div>
                </div>
                <div className="flex justify-between gap-5">
                  <div className="flex justify-between gap-5 w-full">
                    <div className="flex flex-col gap-0.5 w-full">
                      <label htmlFor="input" className="text-slate-500 pl-3">Segment:</label>
                      <input type="text" name="firstName" value={volunteer.segment} className="bg-zinc-100 rounded-sm border border-b-black px-3 py-2 focus:outline-none capitalize" />
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <label htmlFor="input" className="text-slate-500 pl-3">Status:</label>
                      <input type="text" name="firstName" value={volunteer.status} className="bg-zinc-100 rounded-sm border border-b-black px-3 py-2 focus:outline-none capitalize" />
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 w-full">
                    <div className="flex flex-col gap-0.5 w-full">
                      <label htmlFor="input" className="text-slate-500 pl-3">Nickname:</label>
                      <input type="text" name="firstName" value={volunteer?.nickName || ""} className="bg-zinc-100 rounded-sm border border-b-black px-3 py-2 focus:outline-none capitalize" />
                    </div>
                    <div className="flex flex-col gap-0.5 w-full">
                      <label htmlFor="input" className="text-slate-500 pl-3">Placeholder:</label>
                      <input type="text" name="firstName" value={"Placeholder"} className="bg-zinc-100 rounded-sm border border-b-black px-3 py-2 focus:outline-none capitalize" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <h1>Name: {volunteer.name}</h1>
          <h1 className="capitalize">Tier: {volunteer.tier}</h1>
          <h1 className="capitalize">Segment: {volunteer.segment}</h1>
          <h1>Active: {volunteer.active ? "Yes" : "No"}</h1>
          <h1>Schedules:</h1>
          <VolunteerProfile events={schedule} length={length} />
        </div> */}
      </div>
    );
  } catch (error) {
    redirect("/");
  }
}
