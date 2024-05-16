"use client";

import { putScheduleAssign } from '@/utils/apis/put';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

interface Volunteer {
  _id: string
  name: string
  available: boolean
  message: string
}

export default function Select({ volunteers, scheduleId }: {volunteers: Volunteer[], scheduleId: string}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filteredPeople =
    query === ''
      ? volunteers
      : volunteers.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const setScheduleToVolunteer = async (volunteerId: string) => {
    await putScheduleAssign(scheduleId, volunteerId);

    setTimeout(() => {
      router.back();
    }, 200);
    router.refresh();
  }

  const validateAssigneeSchedule = (volunteer: Volunteer) => {
    if (volunteer.available) {
      setScheduleToVolunteer(volunteer._id)
    } else {
      alert(volunteer.message)
    }
  }

  return (
    <div>
      <input className="border border-slate-500" onChange={(event) => setQuery(event.target.value)} />
      <div className="max-h-52 overflow-scroll">
        {filteredPeople.map((volunteer) => (
          <div
            key={volunteer._id}
            className={`cursor-pointer hover:bg-slate-200 ${!volunteer.available && "text-rose-600"}`}
            onClick={() => validateAssigneeSchedule(volunteer)}>{volunteer.name}
          </div>
        ))}
      </div>
    </div>
  )
}
