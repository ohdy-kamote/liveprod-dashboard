import { getSchduleByDateRange } from "@/utils/apis/get";
import { getNextService } from "@/utils/helpers";
import { auth } from "@/auth";
import Link from "next/link";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import CCScheduleBySegment from "../client/CCScheduleBySegment";
import GCTabLInk from '../global/tabs/GCTabLink';

export default async function SCScheduleBySegment({increment, service}: {increment: number, service: string}) {
  const session = await auth();
  const isAuthenticated = (session?.user as any)?.isAdmin;
  const serviceDate1 = getNextService(increment);
  const serviceDate2 = getNextService(increment+1);
  const serviceDate3 = getNextService(increment+2);
  const serviceDate4 = getNextService(increment+3);
  const schedule1 = await getSchduleByDateRange(serviceDate1.saturday, serviceDate1.sunday);
  const schedule2 = await getSchduleByDateRange(serviceDate2.saturday, serviceDate2.sunday);
  const schedule3 = await getSchduleByDateRange(serviceDate3.saturday, serviceDate3.sunday);
  const schedule4 = await getSchduleByDateRange(serviceDate4.saturday, serviceDate4.sunday);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full gap-2 text-slate-700">
        <div className='flex items-center justify-end'>
          <GCTabLInk
            links={[
              `/schedule/segment/audio/saturday?increment=${increment}`,
              `/schedule/segment/audio/sunday?increment=${increment}`,
              `/schedule/segment/audio/events?increment=${increment}`
            ]}
            name={["saturday", "sunday", "events"]}
            labels={["Saturday", "Sunday", "Events"]}
            isSinglePath
          />
        </div>
        <div>
          {service === 'events' ? (
            <div className="mt-[0.5px]">
              <CCScheduleBySegment schedule={{saturday: '', sunday: '', data: []}} dayService={service} isAuthenticated={isAuthenticated} isCompact={false} />
            </div>
          ) : service === 'saturday' ? (
            <div className="grid grid-cols-4 gap-2 w-full mt-[0.5px]">
              <CCScheduleBySegment schedule={schedule1} dayService={service} isAuthenticated={isAuthenticated} isCompact={true} />
              <CCScheduleBySegment schedule={schedule2} dayService={service} isAuthenticated={isAuthenticated} isCompact={true} />
              <CCScheduleBySegment schedule={schedule3} dayService={service} isAuthenticated={isAuthenticated} isCompact={true} />
              <CCScheduleBySegment schedule={schedule4} dayService={service} isAuthenticated={isAuthenticated} isCompact={true} />
            </div>
          ) : (
            <div className="flex gap-2 w-full mt-[0.5px]">
              <CCScheduleBySegment schedule={schedule1} dayService={service} isAuthenticated={isAuthenticated} isCompact={false} />
              <CCScheduleBySegment schedule={schedule2} dayService={service} isAuthenticated={isAuthenticated} isCompact={false} />
            </div>
          )}
        </div>
        {service !== 'events' && (
          <div className='absolute bottom-4 left-0 w-full px-4'>
            <div className=''>
              <div className="flex justify-between">
                <Link className="text-slate-600 hover:underline" href={`/schedule/segment/audio/${service}?increment=${increment-1}`}>
                  <div className='flex gap-2 items-center'>
                    <BsArrowLeftCircle size={22} />
                    <p>Prev Week</p>
                  </div>
                </Link>
                <Link className="text-slate-600 hover:underline" href={`/schedule/segment/audio/${service}?increment=${increment+1}`}>
                  <div className='flex gap-2 items-center'>
                  <p>Next Week</p>
                  <BsArrowRightCircle size={22} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
