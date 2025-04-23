import SCVolunteerCell from "@/components/server/SCVolunteerCell";
import { category, saturday, service, sunday } from "@/utils/constants";
import { formatDate, formatDateLong } from "@/utils/helpers";
import { Fragment } from 'react';

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
    <div className='w-full rounded-xl overflow-hidden'>
      <div className="flex items-center justify-center w-full">
        <table className="table-auto w-full">
          <thead>
            { dayService === service.SATURDAY ?
              <Fragment>
                <tr>
                  <th colSpan={4} className="text-white bg-slate-800 border border-slate-800 uppercase py-2">{formatDateLong(schedule.saturday)}</th>
                </tr>
                <tr className='h-0.5'></tr>
                <tr className='uppercase bg-slate-300 border border-slate-300'>
                  <th colSpan={2}>{service.SATURDAY}</th>
                  <th>{saturday.FIRST_SERVICE}</th>
                  <th>{saturday.SECOND_SERVICE}</th>
                </tr>
              </Fragment> :
              <Fragment>
                <tr>
                  <th colSpan={6} className="text-white bg-slate-800 border border-slate-800 uppercase py-2">{formatDateLong(schedule.sunday)}</th>
                </tr>
                <tr className='h-0.5'></tr>
                <tr className='uppercase bg-slate-300 border border-slate-300'>
                  <th colSpan={2}>{service.SUNDAY}</th>
                  <th>{sunday.FIRST_SERVICE}</th>
                  <th>{sunday.SECOND_SERVICE}</th>
                  <th>{sunday.THIRD_SERVICE}</th>
                  <th>{sunday.FOURTH_SERVICE}</th>
                </tr>
              </Fragment>
            }
          </thead>
          <tbody className='[&>tr]:border [&>tr]:border-slate-300'>
            { (dayService === service.SATURDAY ? category.SNS_ROLES : category.ROLES).map((role, i) => {
              const snsFirst = convertedData?.[category.SATURDAY_SERVICES[0]]?.[role]
              const snsSecond = convertedData?.[category.SATURDAY_SERVICES[1]]?.[role]
              const firstService = convertedData?.[category.SUNDAY_SERVICES[0]]?.[role]
              const secondService = convertedData?.[category.SUNDAY_SERVICES[1]]?.[role]
              const thirdService = convertedData?.[category.SUNDAY_SERVICES[2]]?.[role]
              const fourthService = convertedData?.[category.SUNDAY_SERVICES[3]]?.[role]

              return (
                <tr key={i} className="bg-slate-100 odd:bg-slate-200">
                  <td className="w-9 text-center h-6 text-xs">{i+1}</td>
                  <td className="px-1 w-52 uppercase text-sm">{role.replace("broadcast", "bc")}</td>
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
    </div>
  )
}
