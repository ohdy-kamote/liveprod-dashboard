import SchedulesByRole from "@/components/SchedulesByRole";
import { category } from "@/utils/constants";
import { getLinkedList, linkedListGoToData } from "@/utils/helpers";
import Link from "next/link";
import { Fragment } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default async function FirstRoleDisplay({ params }: {params: { role1: string }}) {
  let roledetails = getLinkedList(category.ROLES);
  if (roledetails) {
    roledetails = linkedListGoToData(roledetails, decodeURI(params.role1));
  }

  return (
    <Fragment>
      <div className="relative">
        <SchedulesByRole role={decodeURI(params.role1)} />
        <div className="flex gap-4 w-full justify-end absolute -bottom-9 pr-3">
          <Link href={`/schedule/role/${roledetails?.prev?.data}`}><BsArrowLeftCircle size={27} /></Link>
          <Link href={`/schedule/role/${roledetails?.next?.data}`}><BsArrowRightCircle size={27} /></Link>
        </div>
      </div>
    </Fragment>
  );
}
