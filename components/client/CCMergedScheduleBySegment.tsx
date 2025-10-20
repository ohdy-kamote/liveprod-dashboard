import SCVolunteerCell from "@/components/server/SCVolunteerCell";
import { category, saturday, sunday } from "@/utils/constants";
import { formatDateLong } from "@/utils/helpers";

interface Schedule {
  saturday: string
  sunday: string
  data: any
}

export default function CCMergedScheduleBySegment({ schedule, isAuthenticated }: { schedule: Schedule, isAuthenticated?: boolean }) {
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
    <div className='w-full rounded-t-xl rounded-b-lg overflow-hidden'>
      <div className="flex items-center justify-center w-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th colSpan={7} className="text-white bg-slate-800 border border-slate-800 uppercase py-2">
                {formatDateLong(schedule.saturday)} & {formatDateLong(schedule.sunday)}
              </th>
            </tr>
            <tr className='h-0.5'></tr>
            <tr className='uppercase bg-slate-300 border-t border-x border-slate-300'>
              <th colSpan={2}>Position</th>
              <th>Sat {saturday.FIRST_SERVICE}</th>
              <th>Sun {sunday.FIRST_SERVICE}</th>
              <th>Sun {sunday.SECOND_SERVICE}</th>
              <th>Sun {sunday.THIRD_SERVICE}</th>
              <th>Sun {sunday.FOURTH_SERVICE}</th>
            </tr>
          </thead>
          <tbody className='[&>tr.last-in-group]:border-b [&>tr.last-in-group]:border-b-black [&>tr.first-in-group]:border-t [&>tr.first-in-group]:border-t-black'>
            {category.ROLES.filter(role => role !== "audio core team").map((role, i) => {
              const satFirst = convertedData?.[category.SATURDAY_SERVICES[0]]?.[role]
              const sunFirst = convertedData?.[category.SUNDAY_SERVICES[0]]?.[role]
              const sunSecond = convertedData?.[category.SUNDAY_SERVICES[1]]?.[role]
              const sunThird = convertedData?.[category.SUNDAY_SERVICES[2]]?.[role]
              const sunFourth = convertedData?.[category.SUNDAY_SERVICES[3]]?.[role]
              const regexFirst = /^(foh)$/i;
              const regexLast = /^(foh observer|broadcast mix observer|audio volunteer 2|monitor mix observer|nxtgen observer)$/i;
              const isFirstInGroup = regexFirst.test(role)
              const isLastInGroup = regexLast.test(role)

              return (
                <tr key={i} data-group={role.slice(0, 3)} className={`${isLastInGroup && "last-in-group"} ${isFirstInGroup && "first-in-group"} border border-slate-300 bg-slate-100 odd:bg-slate-200`}>
                  <td className="w-9 text-center h-6 text-xs">{i+1}</td>
                  <td className="px-1 uppercase w-52 text-sm">{role.replace("broadcast", "bc").replace(/\d+/g, "")}</td>
                  <SCVolunteerCell service={satFirst} />
                  <SCVolunteerCell service={sunFirst} />
                  <SCVolunteerCell service={sunSecond} />
                  <SCVolunteerCell service={sunThird} />
                  <SCVolunteerCell service={sunFourth} />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}