import { getAllVolunteers } from '@/utils/apis/get';
import Select from './Select'

export default async function AssignVolunteer({ scheduleId }: { scheduleId: string }) {
  const res = await getAllVolunteers();

  return (
    <Select volunteers={res.data} scheduleId={scheduleId} />
  )
}
