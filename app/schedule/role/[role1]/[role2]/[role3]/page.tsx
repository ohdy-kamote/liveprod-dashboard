import SCSchedulesByRole from "@/components/server/SCSchedulesByRole";
import { chunkArray } from '@/utils/helpers';
import { Fragment } from "react";

export default function SecondRoleDisplay({ params }: { params: { role1: string, role2: string, role3: string } }) {
  const roles = [decodeURI(params.role1), decodeURI(params.role2), decodeURI(params.role3)];
  const columns = chunkArray(roles, 2);

  return (
    <Fragment>
      <div className='flex flex-col gap-5'>
        { columns.map((column, index) => (
          <div key={index} className="flex gap-0.5 justify-center">
            { column.map((role, idx) => (
              <div key={idx} className={`${column.length === 1 ? "w-1/2": "w-full"} rounded-xl h-50 overflow-hidden`}>
                <SCSchedulesByRole role={role} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
