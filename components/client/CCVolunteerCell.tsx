"use client";

import { useRouter } from "next/navigation";
import { MdOutlineLockPerson } from "react-icons/md";
import { useEffect, useState } from "react";

export default function CCVolunteerCell({ service, isAuthenticated }: { service: any, isAuthenticated: boolean }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (!mounted || !isAuthenticated || !service?.id) return;
    router.push(`/schedule/assign-volunteer/${service?.id}`);
  };

  return (
    <td onClick={handleClick} className={`${isAuthenticated && !!service?.id ? "hover:bg-slate-300 cursor-pointer" : ""} border-x border-x-slate-300 min-w-20`}>
      { !!service?.id ?
        <div className="overflow-hidden h-[1.4rem] text-center">
          {service?.volunteer?.[0]?.firstName}
        </div> :
        <div className="flex justify-center h-[1.4rem]">
          <MdOutlineLockPerson size={22} />
        </div>
      }
    </td>
  );
}
