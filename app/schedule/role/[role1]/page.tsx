import SchedulesByRole from "@/components/SchedulesByRole";
import { category } from "@/utils/constants";
import { getLinkedList, linkedListGoToData } from "@/utils/helpers";
import Link from "next/link";
import { Fragment } from "react";

export default async function FirstRoleDisplay({ params }: {params: { role1: string }}) {
  let roledetails = getLinkedList(category.ROLES);
  if (roledetails) {
    roledetails = linkedListGoToData(roledetails, decodeURI(params.role1));
  }

  return (
    <Fragment>
      <div className="flex items-center justify-evenly flex-col gap-3">
        <SchedulesByRole role={decodeURI(params.role1)} />
        <div className="flex gap-3 w-full justify-end">
          <Link href={`/schedule/role/${roledetails?.prev?.data}`}>{"<< Prev"}</Link>
          <Link href={`/schedule/role/${roledetails?.next?.data}`}>{"Next >>"}</Link>
        </div>
      </div>
    </Fragment>
  );
}
