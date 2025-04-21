import SCVolunteerCell from "@/components/server/SCVolunteerCell";
import { category, saturday, service, sunday } from "@/utils/constants";
import { formatDate, formatDateLong } from "@/utils/helpers";

interface Schedule {
  saturday: string
  sunday: string
  data: any
}

export default function CCScheduleBySegment({ schedule, dayService }: { schedule: Schedule, dayService: string }) {
  const convertData = (data: any) => {
    const convertedData: any = {};
    data?.forEach((item: any) => {
      convertedData[item._id] = {};
      item.service.forEach((service: any) => {
        convertedData[item._id][service.role] = service;
      });
    });
    return convertedData;
  };

  const convertedData: any = convertData(schedule?.data);

  return (
    <div className="flex items-center justify-center w-full">
      <table className="table-auto border border-slate-500 w-full bg-gradient-to-br from-slate-200 to-gray-50">
        <thead>
          <tr>
            <th className="border-l border-slate-500 "></th>
            <th className=""></th>
            { dayService === service.SATURDAY ?
              <th rowSpan={2} colSpan={2} className="border-l border-slate-500 bg-slate-800">
                <div className="flex flex-col justify-between text-white">
                  <div>{formatDate(schedule.saturday)}</div>
                  <div className="flex justify-around uppercase font-normal">
                    <div>{saturday.FIRST_SERVICE}</div>
                    <div>{saturday.SECOND_SERVICE}</div>
                  </div>
                </div>
              </th> :
              <th rowSpan={2} colSpan={4} className="border-l border-slate-500 bg-slate-800">
                <div className="flex flex-col justify-between text-white">
                  <div className='font-extrabold'>{formatDateLong(schedule.sunday)}</div>
                  <div className="flex justify-around uppercase font-normal">
                    <div>{sunday.FIRST_SERVICE}</div>
                    <div>{sunday.SECOND_SERVICE}</div>
                    <div>{sunday.THIRD_SERVICE}</div>
                    <div>{sunday.FOURTH_SERVICE}</div>
                  </div>
                </div>
              </th>
            }
          </tr>
          <tr>
            <th className="border-l border-slate-500 "></th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          { (dayService === service.SATURDAY ? category.SNS_ROLES : category.ROLES).map((role, i) => {
            const snsFirst = convertedData?.[category.SATURDAY_SERVICES[0]]?.[role]
            const snsSecond = convertedData?.[category.SATURDAY_SERVICES[1]]?.[role]
            const firstService = convertedData?.[category.SUNDAY_SERVICES[0]]?.[role]
            const secondService = convertedData?.[category.SUNDAY_SERVICES[1]]?.[role]
            const thirdService = convertedData?.[category.SUNDAY_SERVICES[2]]?.[role]
            const fourthService = convertedData?.[category.SUNDAY_SERVICES[3]]?.[role]

            return (
              <tr key={i} className="">
                <td className="border border-slate-500 w-9 text-center h-6 text-xs">{i+1}</td>
                <td className="border border-slate-500 px-1 w-52 uppercase text-sm">{role.replace("broadcast", "bc")}</td>
                { dayService === service.SATURDAY ?
                  <>
                    <SCVolunteerCell service={snsFirst} />
                    <SCVolunteerCell service={snsSecond} />
                  </> :
                  <>
                    <SCVolunteerCell service={firstService} />
                    <SCVolunteerCell service={secondService} />
                    <SCVolunteerCell service={thirdService} />
                    <SCVolunteerCell service={fourthService} />
                  </>
                }
              </tr>
            )})
          }
        </tbody>
      </table>
    </div>
  )
}
