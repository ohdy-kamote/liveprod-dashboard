export const putScheduleAssign = async (scheduleId: string, volunteerId: string) => {
  await fetch(`${process.env.SOURCE_URL}/api/schedule/assign/${scheduleId}/${volunteerId}`, {
    method: "PUT"
  });
}
