import CpScheduleBySegment from "@/components/ScheduleBySegment";
import Link from "next/link";

export default async function ScheduleBySegment({searchParams}: {searchParams: {increment: string}}) {
  const increment = parseInt(searchParams?.increment || "0");

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-5/6 gap-3">
        <CpScheduleBySegment increment={increment} />
        <div className="flex gap-3 w-full justify-end">
          <Link href={`/schedule/segment/audio?increment=${increment-1}`}>{"<< Prev"}</Link>
          <Link href={`/schedule/segment/audio?increment=${increment+1}`}>{"Next >>"}</Link>
        </div>
      </div>
    </div>
  )
}
