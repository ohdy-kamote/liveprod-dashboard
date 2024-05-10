import Select from './Select'

const getAllVolunteers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/volunteers", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to get volunteers");
    }
    
    return await res.json();
  } catch (error) {
    console.log("Error loading volunteers", error);
  }
}

export default async function AssignVolunteer({ scheduleId }: { scheduleId: string }) {
  const res = await getAllVolunteers();

  return (
    <Select volunteers={res.data} scheduleId={scheduleId} />
  )
}
