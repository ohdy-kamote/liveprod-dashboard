import { SOURCE_URL } from "./source";

interface VolunteerData {
  firstName?: string
  lastName?: string
  nickName?: string
  segment?: string
  status?: string
}

export const postAddVolunteer = async (body: VolunteerData) => {
  await fetch(`${SOURCE_URL}/api/volunteers`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

export const postCreateMonthSchedule = async () => {
  await fetch(`${SOURCE_URL}/api/schedule/month-bulk`, {
    method: "POST"
  });
}
