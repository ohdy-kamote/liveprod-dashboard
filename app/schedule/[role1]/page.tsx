import SchedulesByRole from "@/components/SchedulesByRole";

export default async function FirstRoleDisplay({ params }: { params: { role1: string } }) {
  return (
    <div className="flex justify-center items-center">
      <SchedulesByRole role={decodeURI(params.role1)} />
    </div>
  );
}
