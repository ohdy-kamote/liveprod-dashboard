export const putScheduleAssign = async (scheduleId: string, volunteerId: string) => {
  await fetch(`http://localhost:3000/api/schedule/assign/${scheduleId}/${volunteerId}`, {
    method: "PUT"
  });
}
