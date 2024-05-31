import CpScheduleBySegment from "@/components/ScheduleBySegment";
import Link from "next/link";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default async function ScheduleBySegment({searchParams}: {searchParams: {increment: string}}) {
  const increment = parseInt(searchParams?.increment || "0");

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-5/6 gap-3">
        <CpScheduleBySegment increment={increment} />
        <div className="flex gap-3 w-full justify-end">
          <Link className="hover:bg-slate-800 hover:text-slate-50 rounded-full" href={`/schedule/segment/audio?increment=${increment-1}`}>
            <BsArrowLeftCircle size={27} />
          </Link>
          <Link className="hover:bg-slate-800 hover:text-slate-50 rounded-full" href={`/schedule/segment/audio?increment=${increment+1}`}>
            <BsArrowRightCircle size={27} />
          </Link>
        </div>
      </div>
    </div>
  )
}
