import AssignVolunteer from "@/components/AssignVolunteer";

export default function Page({ params }: { params: { id: string }}) {
  return <AssignVolunteer scheduleId={params.id} />
}
