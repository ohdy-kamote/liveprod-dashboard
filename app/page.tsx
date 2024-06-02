import Image from "next/image";
import { Fragment } from "react";
import { BiSolidHome } from "react-icons/bi";
import { ImHome3 } from "react-icons/im";
import { IoHome } from "react-icons/io5";
import { PiLegoSmiley, PiLegoSmileyDuotone } from "react-icons/pi"

export default function Home() {
  return (
    <Fragment>
      <div className="flex flex-col gap-20">
        <div className="flex gap-1 text-slate-700">
          <PiLegoSmileyDuotone size={27} />
          {/* <BiSolidHome size={22} /> */}
            <div className="flex flex-col justify-center">
              This is the Live Prod Homepage. Navigate to see other pages...
            </div>
          <PiLegoSmiley size={27} />
        </div>
        <div className="flex flex-col justify-center h-96 items-center text-slate-700">
          <div className="flex flex-col gap-5">
            <em className="text-xl">{`"age is something that doesn't matter, unless you are a cheese"`}</em>
            <div className="flex justify-end">
              - CathMeg 2024 Non-Quotable Quotes (3 of 33)
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center absolute bottom-0 right-0">
        <Image src="/sleeping-quby.gif" alt="loading" width={120} height={120} />
      </div>
    </Fragment>
  );
}
