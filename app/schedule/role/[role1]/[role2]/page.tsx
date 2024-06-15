import CpAddRow from "@/components/AddRow";
import LoadingComponent from "@/components/Loading";
import SCSchedulesByRole from "@/components/server/SCSchedulesByRole";
import { Fragment, Suspense } from "react";

export default function SecondRoleDisplay({ params }: { params: { role1: string, role2: string } }) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="flex gap-0.5">
        <SCSchedulesByRole role={decodeURI(params.role1)} />
        <SCSchedulesByRole role={decodeURI(params.role2)} />
      </div>
      <CpAddRow />
    </Suspense>
  )
}
