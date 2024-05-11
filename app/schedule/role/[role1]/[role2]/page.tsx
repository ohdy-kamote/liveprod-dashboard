import SchedulesByRole from "@/components/SchedulesByRole";

export default async function SecondRoleDisplay({ params }: { params: { role1: string, role2: string } }) {
  return (
    <div className="flex gap-3">
      <SchedulesByRole role={decodeURI(params.role1)} />
      <SchedulesByRole role={decodeURI(params.role2)} />
    </div>
  );
}
