import SCFlexibleSchedulesByRole from "@/components/server/SCFlexibleSchedulesByRole";
import { roleFilter } from '@/utils/constants';
import { chunkArray } from '@/utils/helpers';
import { Fragment } from "react";

export default function FlexibleScheduleDemo({params}: {params: {role1: string}}) {
  const roles = roleFilter.find((role) => role.value === "foh")?.roles || [];
  const columns = chunkArray(roles, 2);

  return (
    <Fragment>
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400 mb-6">
        <h1 className="text-xl font-bold text-blue-800 mb-2">Flexible Schedule Demo</h1>
        <p className="text-blue-700">
          This is a demonstration of the flexible schedule system. You can now easily add/remove time columns 
          through the configuration system. Visit <a href="/admin/schedule-config" className="underline">Admin → Schedule Config</a> to manage service times.
        </p>
      </div>
      
      <div className='flex flex-col gap-3'>
        { columns.map((column, index) => (
          <div key={index} className="flex gap-3 justify-center">
            { column.map((role, idx) => (
              <div key={idx} className={`${column.length === 1 ? "w-1/2": "w-full"} rounded-t-xl rounded-b-lg h-50 overflow-hidden`}>
                <SCFlexibleSchedulesByRole role={role} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
