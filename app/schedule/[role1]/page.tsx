import SchedulesByRole from "@/components/SchedulesByRole";
import { category } from "@/utils/constants";
import { getLinkedList, linkedListGoToData } from "@/utils/helpers";
import Link from "next/link";

export default async function FirstRoleDisplay({ params }: {params: { role1: string }}) {
  let roledetails = getLinkedList(category.ROLES);
  if (roledetails) {
    roledetails = linkedListGoToData(roledetails, decodeURI(params.role1));
  }

  return (
    <div className="flex items-center justify-evenly">
      <Link href={`/schedule/${roledetails?.prev?.data}`}>{"<< Prev"}</Link>
      <SchedulesByRole role={decodeURI(params.role1)} />
      <Link href={`/schedule/${roledetails?.next?.data}`}>{"Next >>"}</Link>
    </div>
  );
}
