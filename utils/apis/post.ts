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

export const getAdmin = async (username: string, password: string) => {
  try {
    // Import here to avoid circular dependencies
    const connectMongoDB = (await import('@/libs/mongodb')).default;
    const Admin = (await import('@/models/admin')).default;
    
    await connectMongoDB();
    const admin = await Admin.findOne({ username, password });
    
    if (!admin) {
      throw new Error("Admin not found");
    }

    return { data: admin };
  } catch (error) {
    console.log("Error loading admin:", error);
    throw error;
  }
}
