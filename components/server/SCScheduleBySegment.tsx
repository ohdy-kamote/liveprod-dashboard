import { getNextService } from "@/utils/helpers";
import { auth } from "@/auth";
import Link from "next/link";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import CCScheduleBySegment from "../client/CCScheduleBySegment";
import CCMergedScheduleBySegment from "../client/CCMergedScheduleBySegment";
import GCTabLInk from '../global/tabs/GCTabLink';
import connectMongoDB from "@/libs/mongodb";
import Schedule from "@/models/schedule";

export default async function SCScheduleBySegment({increment, service}: {increment: number, service: string}) {
  const session = await auth();
  const isAuthenticated = (session?.user as any)?.isAdmin;
  const serviceDate1 = getNextService(increment);
  const serviceDate2 = getNextService(increment+1);
  
  // Get schedules directly from database
  await connectMongoDB();
  const schedules1 = await Schedule.find({
    date: { $gte: serviceDate1.saturday, $lte: serviceDate1.sunday }
  });
  const schedules2 = await Schedule.find({
    date: { $gte: serviceDate2.saturday, $lte: serviceDate2.sunday }
  });
  
  const schedule1 = { saturday: serviceDate1.saturday, sunday: serviceDate1.sunday, data: schedules1 };
  const schedule2 = { saturday: serviceDate2.saturday, sunday: serviceDate2.sunday, data: schedules2 };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full gap-2 text-slate-700">
        <div className='flex items-center justify-end mb-6'>
          <GCTabLInk
            links={[
              `/schedule/segment/audio/regular?increment=${increment}`,
              `/schedule/segment/audio/events?increment=${increment}`
            ]}
            name={["regular", "events"]}
            labels={["Regular Service", "Events"]}
            isSinglePath
          />
        </div>
        <div>
          {service === 'events' ? (
            <div className="mt-[0.5px]">
              <CCScheduleBySegment schedule={{saturday: '', sunday: '', data: []}} dayService={service} isAuthenticated={isAuthenticated} isCompact={false} />
            </div>
          ) : (
            <div className="flex gap-2 w-full mt-[0.5px]">
              <CCMergedScheduleBySegment schedule={schedule1} isAuthenticated={isAuthenticated} />
              <CCMergedScheduleBySegment schedule={schedule2} isAuthenticated={isAuthenticated} />
            </div>
          )}
        </div>
        {service !== 'events' && (
          <div className='absolute bottom-4 left-0 w-full px-4'>
            <div className=''>
              <div className="flex justify-between">
                <Link className="text-slate-600 hover:underline" href={`/schedule/segment/audio/regular?increment=${increment-1}`}>
                  <div className='flex gap-2 items-center'>
                    <BsArrowLeftCircle size={22} />
                    <p>Prev Week</p>
                  </div>
                </Link>
                <Link className="text-slate-600 hover:underline" href={`/schedule/segment/audio/regular?increment=${increment+1}`}>
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
