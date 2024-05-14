import { getVolunteerById } from "@/utils/apis/get";

export default async function VolunteerProfile({ params }: { params: { id: string }}) {
  const res = await getVolunteerById(params.id);
  const volunteer = res.data;

  return (
    <div>
      <h1>Name: {volunteer.name}</h1>
      <h1>Tier: {volunteer.tier}</h1>
      <h1>Segment: {volunteer.segment}</h1>
      <h1>Active: {volunteer.active}</h1>
      <h1>Schedules:</h1>
      {volunteer.schedules.map((schedule: any) => (
        <div className="flex gap-3" key={schedule._id}>
          <div>Date: {new Date(schedule.date).toLocaleDateString()}</div>
          <div>Role:&nbsp;
            <span className="uppercase">{schedule.role}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
