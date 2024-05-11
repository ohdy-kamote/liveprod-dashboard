"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function Select({ volunteers, scheduleId }: {volunteers: { _id: string, name: string }[], scheduleId: string}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filteredPeople =
    query === ''
      ? volunteers
      : volunteers.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const setScheduleToVolunteer = async (volunteerId: string) => {
    await fetch(`http://localhost:3000/api/schedule/assign/${scheduleId}/${volunteerId}`, {
      method: "PUT"
    });

    setTimeout(() => {
      router.back();
    }, 200);
    router.refresh();
  }

  return (
    <div>
      <input className="border border-slate-500" onChange={(event) => setQuery(event.target.value)} />
      <div className="max-h-52 overflow-scroll">
        {filteredPeople.map((volunteer) => (
          <div key={volunteer._id} className="cursor-pointer hover:bg-slate-200" onClick={() => setScheduleToVolunteer(volunteer._id)}>{volunteer.name}</div>
        ))}
      </div>
    </div>
  )
}
